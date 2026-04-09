<div align="center">
    <img src="src/assets/icon.svg" width="100">
    <h1>Log Tier</h1>
</div>

Log Tier is a free, open source program made to make large tier lists quickly. 

Rather than ranking each item in a Tier List one by one, Log Tier uses a Binary Search algorithm to find the place of elements in *log*arithmic time, which makes large tier lists significantly easier to manage.

## Status 

Log Tier is in early development, and changes are frequent

Currently you can order a set of images, but there are no distinct tiers

UI is minimal, as the core funcionality is still being worked on

## Roadmap

- [x] Order one tier

- [ ] 6 separate tiers
    - Create an approximately normal distribution across 6 points

- [ ] N Tiers
    - Manually change size of, and amount of tiers, eg. 4 tiers with 25% each rather than a normal distribution of 6

- [ ] Prettification
    - 

## Building from source

To use Log Tier, you will need to have Node.js, you can download Node.js from [here](https://nodejs.org/en/download)

Open a terminal and download the repo

`git clone https://github.com/poglat/log-tier.git`

Open the project

`cd log-tier`

Install dependencies

`npm install`

Build the project

`npm run build`

From there you can just open dist/index.html in your browser of choice. If you ever make changes to src, make sure to build the project again, and run from dist. 

## Contributing

Check [CONTRIBUTING.md](CONTRIBUTING.md)

## Licenses

All Log Tier source code is licensed underneath the [GPL-3.0 only](LICENSES/gpl-3.0.txt).

The visual assets [favicon.ico](src/favicon.ico) and [icon.svg](assets/icon.svg) are marked [CC0 1.0](LICENSES/cc0-1.0.txt)