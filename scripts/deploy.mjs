// Publishes the site: builds, checks, and pushes out/ to the gh-pages branch, which GitHub Pages serves at
// https://workout.ironbuddy.fit. Run from the repo root on a clean main:  node scripts/deploy.mjs
//
// Why not a GitHub Actions workflow: the GitHub login on this PC has no `workflow` permission, so a workflow file
// can't be pushed. The ready-made workflow is in docs/pages-workflow.yml; to switch to it, run
// `gh auth refresh -h github.com -s workflow`, move it to .github/workflows/pages.yml, push, and set
// Settings → Pages → Source to "GitHub Actions".
import { execSync } from "node:child_process";
import { mkdtempSync, rmSync, writeFileSync, cpSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";

const run = (cmd, opts = {}) => execSync(cmd, { stdio: "inherit", ...opts });
const out = (cmd) => execSync(cmd).toString().trim();

if (out("git status --porcelain")) throw new Error("Commit or stash your changes first: deploys come from a committed main.");
const sha = out("git rev-parse --short HEAD");

run("npm run build");
run("node scripts/check-seo.mjs out");
writeFileSync("out/.nojekyll", "");
writeFileSync("out/CNAME", "workout.ironbuddy.fit");

const dir = mkdtempSync(path.join(tmpdir(), "ib-deploy-"));
cpSync("out", dir, { recursive: true });
const git = (cmd) => run(cmd, { cwd: dir });
git("git init -q -b gh-pages");
git('git config user.name "ironbuddyapp"');
git('git config user.email "293209893+ironbuddyapp@users.noreply.github.com"');
git("git add -A");
git(`git commit -q -m "Deploy ${sha}"`);
git("git push -q -f https://github.com/ironbuddyapp/ironbuddy-workout-site.git gh-pages");
rmSync(dir, { recursive: true, force: true });
console.log(`Deployed ${sha}. GitHub Pages publishes it in about a minute.`);
