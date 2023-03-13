# Hanna Twig Templates

This module contains [.twig](https://twig.symfony.com/) templates that
implement the Hanna design system HTML patterns.

These templates are currently somewhat coupled with Reykjavík's Drupal-driven
main website, but the longer term goal is to de-couple them completely, to
allow reuse by other CMS setups.

## Downloading the Template Files.

### Download using git's sparse checkout

The following shell script runs fast and **only** downloads the latest
hanna-twig source files, and none of the git history.

This requires only a relatively modern version of `git`.

```sh
mkdir hanna-twig
mkdir hanna-twig/__temp
cd hanna-twig/__temp
git init
git sparse-checkout set .
git config --worktree core.sparseCheckoutCone 'false'
git sparse-checkout set modules/hanna-twig/src
git remote add origin git@github.com:rvk-utd/hanna.git
git fetch origin main --depth 1 --filter=blob:none
git merge origin/main
mv modules/hanna-twig/src/* ..
cd ..
rm -rf __temp
```

### Download in browser

Visit [download-directory.github.io](https://download-directory.github.io/)
and paste in the URL of the
[hanna-twig/src](https://github.com/rvk-utd/hanna/tree/main/modules/hanna-twig/src)

Direct download link:
<https://download-directory.github.io?url=https://github.com/rvk-utd/hanna/tree/main/modules/hanna-twig/src>
