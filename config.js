//pulling credentials from injected environment variables
var dataString = (JSON.parse(process.env.DATA_STR))[0];
module.exports = {
    mlab:{
        db : dataString.mlab.db,
	    user : dataString.mlab.user,
	    passwd : dataString.mlab.passwd,
    },
    admin_creds:{
        username: dataString.admin_creds.username,
        passwd: dataString.admin_creds.passwd,
    }
}