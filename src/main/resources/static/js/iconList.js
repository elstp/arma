var playerIcon = L.Icon.extend({
    options: {
        shadowUrl: '/aa3icon/player-lay.png',
        shadowSize: [32, 48],
        iconSize: [48, 48]
    }
});

var aiIcon = L.Icon.extend({
    options: {
        iconSize: [48, 48]
    }
});
var aiImgIcon = L.Icon.extend({
    options: {
        iconSize: [84, 64]
    }
});

var playerImgIcon = L.Icon.extend({
    options: {
        shadowUrl: '/aa3icon/player-lay.png',
        shadowSize: [84, 64],
        iconSize: [84, 64]
    }
});




var playerWest =  new playerIcon({iconUrl: '/aa3icon/iconManOfficer-west.png'});
var west =  new aiIcon({iconUrl: '/aa3icon/iconManOfficer-west.png'});
var east =  new aiIcon({iconUrl: '/aa3icon/iconManOfficer-east.png'});
var aaf =  new aiIcon({iconUrl: '/aa3icon/iconManOfficer-independant.png'});
var civ =  new aiIcon({iconUrl: '/aa3icon/iconManOfficer-civilian.png'});

var west_other =  new aiIcon({iconUrl: '/aa3icon/icomap_igla_aa_pod_CA-west.png'});
var east_other =  new aiIcon({iconUrl: '/aa3icon/icomap_igla_aa_pod_CA-east.png'});
var civ_other =  new aiIcon({iconUrl: '/aa3icon/icomap_igla_aa_pod_CA-civilian.png'});
var aaf_other =  new aiIcon({iconUrl: '/aa3icon/icomap_igla_aa_pod_CA-independant.png'});


//AT
var west_AT =  new aiIcon({iconUrl: '/aa3icon/iconManAT-west.png'});
var east_AT =  new aiIcon({iconUrl: '/aa3icon/iconManAT-east.png'});
var aaf_AT =  new aiIcon({iconUrl: '/aa3icon/iconManAT-independant.png'});
var civ_AT =  new aiIcon({iconUrl: '/aa3icon/iconManAT-civilian.png'});
//Medic
var west_Medic =  new aiIcon({iconUrl: '/aa3icon/iconManMedic-west.png'});
var east_Medic =  new aiIcon({iconUrl: '/aa3icon/iconManMedic-east.png'});
var aaf_Medic =  new aiIcon({iconUrl: '/aa3icon/iconManMedic-independant.png'});
var civ_Medic =  new aiIcon({iconUrl: '/aa3icon/iconManMedic-civilian.png'});
//MG
var west_MG =  new aiIcon({iconUrl: '/aa3icon/iconManMG-west.png'});
var east_MG =  new aiIcon({iconUrl: '/aa3icon/iconManMG-east.png'});
var aaf_MG =  new aiIcon({iconUrl: '/aa3icon/iconManMG-independant.png'});
var civ_MG =  new aiIcon({iconUrl: '/aa3icon/iconManMG-civilian.png'});

//MG
var west_MG =  new aiIcon({iconUrl: '/aa3icon/iconManMG-west.png'});
var east_MG =  new aiIcon({iconUrl: '/aa3icon/iconManMG-east.png'});
var aaf_MG =  new aiIcon({iconUrl: '/aa3icon/iconManMG-independant.png'});
var civ_MG =  new aiIcon({iconUrl: '/aa3icon/iconManMG-civilian.png'});