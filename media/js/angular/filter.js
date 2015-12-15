app.filter('gender', function () {
    return function (input) {
        if (input == 1) {
            return "Homme";
        } else if (input == 0) {
            return "Femme";
        } else {
            return null;
        }
    };
});

app.filter('phoneformat', function () {
    return function (input) {
        if(input.match(/[+]/)){
            console.log(input.length);
            var deb = input.slice(0,3);
            input = "0" + input.slice(3,input.length);
            var final = "("+deb+") ";
        }else{
            var final = '';
        }

        var parts = input.match(/[\s\S]{1,2}/g) || [];


        for (part in parts) {
            if(part != parts.length - 1){
                final = final + parts[part] + ".";
            }else{
                final = final + parts[part];
            }
        }
        return final;
    };
});

app.filter('bloodgroup', function () {
    return function (input) {
        switch (input) {
            case 0:
                return "O+";
                break;
            case 1:
                return "O-";
                break;
            case 2:
                return "A+";
                break;
            case 3:
                return "A-";
                break;
            case 4:
                return "B+";
                break;
            case 5:
                return "B-";
                break;
            case 6:
                return "AB+";
                break;
            case 7:
                return "AB-";
                break;
            default:
                return null;

        }
    };
});