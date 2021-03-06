const CP = require('child_process');
const Path = require('path');
const Util = require('util');

const Assign = require('lodash.assign');
const Code = require('code');
const ESLint = require('eslint');
const Lab = require('lab');
const TemporaryDirectory = require('temporary-directory');

const Packages = require('./packages.json');

const CLIEngine = new ESLint.CLIEngine({
  configFile: Path.join(__dirname, '..', 'index.js')
});

var lab = exports.lab = Lab.script();
var describe = lab.describe;
var it = lab.it;
var before = lab.before;
var after = lab.after;
var expect = Code.expect;

var rmTmp, tmpDir;

const TIMEOUT = 30000; // 30 seconds

function spawn(command, args, opts, done) {
  var child = CP.spawn(command, args, Assign(opts, { stdio: 'ignore' }));

  child.on('error', done);
  child.on('close', function (code) {
    if (code === 0) done();
    else done(new Error('non-zero exit code: ' + code));
  });
}

before(function (done) {
  TemporaryDirectory(function (err, dir, cb) {
    if (err) return done(err);
    rmTmp = cb;
    tmpDir = dir;

    done();
  });
});

after(function (done) {
  rmTmp(done);
});

describe('packages that use mod-standard:', function () {
  var dir;

  Packages.forEach(function (pkg) {
    describe(pkg.name, function () {
      before({ timeout: TIMEOUT }, function (done) {
        var gitArgs = ['clone', '--depth', 1];

        if (pkg.disabled) return done();

        dir = Path.join(tmpDir, pkg.name);
        gitArgs.push(Util.format('%s.git', pkg.repo), dir);

        spawn('git', gitArgs, { cwd: tmpDir }, done);
      });

      if (pkg.disabled) {
        it(pkg.disabled, { skip: true }, function (done) {
          done();
        });
      } else {
        it('does not yield errors', function (done) {
          expect(CLIEngine.executeOnFiles([dir]).errorCount).to.equal(0);
          done();
        });
      }
    });
  });
});
