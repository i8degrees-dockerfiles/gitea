//
// [SOURCE](https://github.com/upend/IF_MS_BUYS_GITHUB_IMMA_OUT/issues/121#issuecomment-405165252)
//

const exec = require('child_process').exec
const https = require('https')

console.log(`Fetching gists data of user ${process.argv[2]}`)

function execute(command) {

    exec(command, (err, stdout, stderr) => {
        process.stdout.write(stdout)
    })
}

function request(path) {
    const options = {
        hostname: 'api.github.com',
        path,
        method: 'GET',
        headers: { 'User-Agent': 'Mozilla/5.0' }
    }
    return new Promise((resolve, reject) => {
        let body = ''
        https.get(options, res => {
            res.on('data', data => body += data)
            res.on('end', () => resolve(body))
        })
    })
}

request(`/users/${process.argv[2]}/gists`)
    .then(data => {
        return JSON.parse(data)
    })
    .then(gists => {
        console.log(gists)
        gists.forEach(gist => {
            const file = Object.keys(gist.files)[0]
            console.log('Found gist ' + file)
            console.log(`Cloning ${gist.git_pull_url} into ${file}...`)

            exec(`git clone ${gist.git_pull_url} ${file}`)
        })
    })
    .then(() => console.log('Waiting for the magic.....'))
