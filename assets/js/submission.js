$(document).ready(function () {
    $('.building_type').hide();
    
    $('#building-type').change(function () {
        $('.building_type').hide();
        $('#fields-'+$(this).val()).show();
    });

    getResidentialInputFields().change(function () {
        $('#elevator-estimation').text(getResidentialElevatorsEstimate());
    })

    getCommercialInputFields().change(function () {
        $('#elevator-estimation').text(getCommercialElevatorsEstimate());
    })

    getCorporateInputFields().change(function () {
        $('#elevator-estimation').text(getCorporateElevatorsEstimate());
    })

    getHybridInputFields().change(function () {
        $('#elevator-estimation').text(getHybridElevatorsEstimate());
    })

});

function getValuesFrominputField(inputFields) {
    var values = [];

    inputFields.each(function (i) {
        values[i] = $(this)[0].value;
    })
    
    return values;
}

// RESIDENTIAL
function getResidentialInputFields () {
    return $('#nb-apartments-input-res, #nb-floors-input-res, #nb-basements-input-res');
}

function getResidentialElevatorsEstimate() {
    var values = getValuesFrominputField(getResidentialInputFields());

    var nb_apt = values[0];

    var nb_floors = values[1];
    
    var nb_basement = values[2];

    var average_apt = nb_apt/(nb_floors-nb_basement) ;

    var nb_elevators = average_apt/6;

    if (nb_floors == 0) {
        nb_elevators = 0;
    }

    if (nb_apt > 20) {
        return Math.ceil(nb_elevators*2);
    }
    
    return Math.ceil(nb_elevators);

}

// COMMERCIAL
function getCommercialInputFields () {
    return $('#nb-floors-input-com, #nb-basements-input-com, #nb-companies-input-com, #nb-parking-input-com, #nb-elevators-input-com');
}

function getCommercialElevatorsEstimate() {
    var values = getValuesFrominputField(getCommercialInputFields());

    var nb_floors = values[0];

    var nb_basement = values[1];
    
    var nb_companies = values[2];

    var nb_parking = values[3];

    var nb_elevators = values[4];

    return Math.ceil(nb_elevators);

}

// CORPORATE
function getCorporateInputFields () {
    return $('#nb-floors-input-cor, #nb-basements-input-cor, #nb-parking-input-cor, #nb-corporations-input-cor, #max-occupancy-input-cor ');
}

function getCorporateElevatorsEstimate() {
    var values = getValuesFrominputField(getCorporateInputFields());

    var nb_floors = values[0];

    var nb_basement = values[1];
    
    var nb_parking = values[2];

    var nb_corporation = values[3];

    var max_occupancy = values[4];

    var total_occupant = max_occupancy*(nb_floors+nb_basement);

    var nb_elevators = total_occupant / 1000;

    var nb_elevator_columns = (nb_floors+nb_basement)/20;

    var average_elevator_column = nb_elevators/nb_elevator_columns;

    nb_elevators_total = average_elevator_column*nb_elevator_columns
    
    if (nb_floors+nb_basement == 0) {
        nb_elevators_total = 0;
    }

    return Math.ceil(nb_elevators_total);

}

// HYBRID

function getHybridInputFields () {
    return $('#nb-floors-input-hyb, #nb-basements-input-hyb, #nb-companies-input-hyb, #nb-parking-input-hyb, #max-occupancy-input-hyb, #business-hours-input-hyb ');
}

function getHybridElevatorsEstimate() {
    var values = getValuesFrominputField(getHybridInputFields());

    var nb_floors = values[0];

    var nb_basement = values[1];
    
    var nb_companies = values[2];

    var nb_parking = values[3];

    var max_occupancy = values[4];

    var business_hours = values[5];

    var total_occupant = max_occupancy*(nb_floors+nb_basement);

    var nb_elevators = total_occupant / 1000;

    var nb_elevator_columns = (nb_floors+nb_basement)/20;

    var average_elevator_column = nb_elevators/nb_elevator_columns;

    nb_elevators_total = average_elevator_column*nb_elevator_columns;
    
    if (nb_floors+nb_basement == 0) {
        nb_elevators_total = 0;
    }

    return Math.ceil(nb_elevators_total);

}