# punchcards

This is a replica of GitHub's punchcard graphs, except rolled up to the user
level (for all non-forked repositories owned by the user) instead of just by
repository. It uses node on the backend to make API calls against the GitHub
API, and vanilla JS/D3 on the frontend to display the graph.

## running

First, go to https://github.com/settings/tokens and generate a personal access
token. Paste it in a file called "token" in this directory. Then:

    $ npm install
    $ npm run build-client   # watches for changes
    $ npm run run-server     # run this in another tab
