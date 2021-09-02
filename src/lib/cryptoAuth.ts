import md5 from 'md5';

export function md5Password (username: any, password: any) {
	let prekey = md5('DonT,H4Ck._ThIs');
	let enc_username = md5(username);
	let enc_password = md5(password);
	let subkey = md5('Why-Y0u-Do-Th4t');
	let itransport = md5('ITransport-API');
	
	let newPassword = md5(itransport+prekey+enc_username+enc_password+subkey+username+enc_password+subkey);
	return newPassword;
}