# Hanna Twig Templates <!-- omit from toc -->

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
mkdir __temp
cd __temp
git init
git sparse-checkout set .
git config --worktree core.sparseCheckoutCone 'false'
git sparse-checkout set modules/hanna-twig/src
git remote add origin git@github.com:rvk-utd/hanna.git
git fetch origin main --depth 1 --filter=blob:none
git checkout main
cd ..
mv __temp/modules/hanna-twig/src ./hanna-twig
rm -rf __temp
```

Leaves you with a neat folder called `hanna-twig`.

NOTE: You can replace the two occurrances of the branch name `main` in the
script above, with any commit SHA (or branch name) you like.

### Download in browser

Visit [download-directory.github.io](https://download-directory.github.io/)
and paste in the URL of the
[hanna-twig/src](https://github.com/rvk-utd/hanna/tree/main/modules/hanna-twig/src)

Direct download link:
<https://download-directory.github.io?url=https://github.com/rvk-utd/hanna/tree/main/modules/hanna-twig/src>

## Using the Templates in Drupal

To integrate Hanna Twig templates into a Drupal theme, you can create a custom
library. To get that add the following code into Drupal.

In composer.json file add the following code:

```json
"repositories": [
  {
            "type": "package",
            "package": {
                "name": "<project_name>/hanna",
                "version": "master",
                "type": "drupal-hanna",
                "dist": {
                    "url": "https://github.com/rvk-utd/hanna/archive/refs/heads/main.zip",
                    "type": "zip"
                }
            }
        }
]
"scripts": {
        "post-install-cmd": [
            "find web/themes/custom/<your_custom_theme>/hanna -mindepth 1 -maxdepth 1 ! -iname modules -exec rm -rvf {} \\;",
            "find web/themes/custom/<your_custom_theme>/hanna/modules -mindepth 1 -maxdepth 1 ! -iname hanna-twig -exec rm -rvf {} \\;"
        ]
    },
 "installer-types": ["drupal-hanna"],
 "installer-paths": {"web/themes/custom/reykjavik/{$name}": ["type:drupal-hanna"]}
```

Once the new repository is set in composer.json file, run the following
command:

```sh
composer require "<project_name>/hanna"
```

Then hanna-twig template will be available in the following path:

```sh
web/themes/custom/<your_custom_theme>/hanna/modules/hanna-twig/src
```
