exports.getLeagues = function (req, res) {
    var myHeaders = new Headers();
    myHeaders.append("x-apisports-key", "87eff838b47656d9d3250bafa2e8800c");

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    fetch("https://v3.football.api-sports.io/leagues", requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
}