$(document).ready(function () {
    $('.building_type').hide();
    
    $('#building-type').change(function () {
        $('.building_type').hide();
        $('#fields-'+$(this).val()).show();
    });

    getResidentialInputFields().change(function () {
        $('#elevator-amount').text(getResidentialElevatorsEstimate());
    })

    getCommercialInputFields().change(function () {
        $('#elevator-amount').text(getCommercialElevatorsEstimate());
    })

    getCorporateInputFields().change(function () {
        $('#elevator-amount').text(getCorporateElevatorsEstimate());
    })

    getHybridInputFields().change(function () {
        $('#elevator-amount').text(getHybridElevatorsEstimate());
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

    var nb_apt = parseInt(values[0]);
    var nb_floors = parseInt(values[1]);
    
    var average_apt = nb_apt/(nb_floors) ;
    var nb_elevators = average_apt/6;

    if (nb_floors == 0) {
        nb_elevators = 0;
    }

    if (nb_floors > 20) {
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

    var nb_elevators = parseInt(values[4]);

    return Math.ceil(nb_elevators);

}

// CORPORATE
function getCorporateInputFields () {
    return $('#nb-floors-input-cor, #nb-basements-input-cor, #nb-parking-input-cor, #nb-corporations-input-cor, #max-occupancy-input-cor ');
}

function getCorporateElevatorsEstimate() {
    var values = getValuesFrominputField(getCorporateInputFields());

    var nb_floors = parseInt(values[0]);
    var nb_basement = parseInt(values[1]);
    var max_occupancy = parseInt(values[4]);

    var total_occupant = max_occupancy*(nb_floors+nb_basement);
    var nb_elevators = total_occupant/1000;
    var nb_elevator_columns = (nb_floors+nb_basement)/20;
    var average_elevator_column = nb_elevators/nb_elevator_columns;
    var nb_elevators_total = average_elevator_column*nb_elevator_columns;
    
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

    var nb_floors = parseInt(values[0]);
    var nb_basement = parseInt(values[1]);
    var max_occupancy = parseInt(values[4]);

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

function getServicePrice() {
    var standardPrice = 7565;
    var premiumPrice = 12345;
    var exceliumPrice = 15400;

    var standardquality = document.getElementById('standardquality');
    var premiumquality = document.getElementById('premiumquality');
    var exceliumquality = document.getElementById('exceliumquality');

    var divPriceQuality = document.getElementById('elevator-unit-price');

    var elevatorAmountInput = document.getElementById('elevator-total-input');
    var installationAmountInput = document.getElementById('installation-fees-input');
    var totalAmountInput = document.getElementById('final-price-input');

    var elevatorEstimation = parseInt(document.getElementById('elevator-amount').textContent);

    var selectedPrice;
    var selectedPercent;

    if (standardquality.checked) {
        divPriceQuality.innerHTML =
        "Unit Price for Standard Quality: " + standardPrice + " $";
        selectedPrice = standardPrice;
        selectedPercent = 0.1;
        
    }
    if (premiumquality.checked) {
        divPriceQuality.innerHTML =
        "Unit Price for Premium Quality: " + premiumPrice + " $";
        selectedPrice = premiumPrice;
        selectedPercent = 0.13;
    }
    if (exceliumquality.checked) {
        divPriceQuality.innerHTML =
        "Unit Price for Excelium Quality: " + exceliumPrice + " $";
        selectedPrice = exceliumPrice;
        selectedPercent = 0.16;
    }

    elevatorAmountInput =  selectedPrice*elevatorEstimation;
    document.getElementById('elevator-total-input').value = elevatorAmountInput;

    installationAmountInput = selectedPercent*elevatorAmountInput;
    document.getElementById('installation-fees-input').value = installationAmountInput;

    totalAmountInput = elevatorAmountInput+installationAmountInput;
    document.getElementById('final-price-input').value = totalAmountInput;
}