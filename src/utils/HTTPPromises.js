const HOST  = "https://lementtest2.lement.pro:443";
const AUTH_URL = HOST + '/authentication/v1/authenticate';                
const CLIENT_ID = '7CMZFMmL22BaEhZSp0Uel052iL5aussd';
const CLIENT_SECRET = 'RnRA7ThEt0DGPAsK';
var token;

var HTTPPromises = {
    getAuthToken: function() {
        return $.ajax({
            url: AUTH_URL,
            method: "POST",
            crossOrigin: true,      
            data: `client_id=${CLIENT_ID}` + 
                `&client_secret=${CLIENT_SECRET}` + 
                `&grant_type=client_credentials` + 
                `&scope=viewables:read%20data:read`
        }).done(function(response){
            token = response;
        })
    }
};

export default HTTPPromises;