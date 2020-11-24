let xhr,
    response,
    dateDisplayMap = {
        DateMonthYear: 'userDateLongMonthFull',
        MonthYear: 'userLongMonthYear',
        Year: 'year',
    },
    stringBuilderArray = [],
    fullName = document.getElementById('full-name'),
    title,
    experienceContainer,
    contactContainer,
    aboutContainer,
    skillContainer,
    toolsContainer,
    basicInfoContainer,
    trainingCertificationContainer,
    educationContainer,
    profilePhoto,
    qrCodeContainer,
    qrCodeCanvas,
    qrCodeContainerWidth;

document.onreadystatechange = () => {
    fullName = document.getElementById('full-name');
    title = document.getElementById('title');
    experienceContainer = document.getElementById('experience');
    contactContainer = document.getElementById('contact');
    aboutContainer = document.getElementById('about');
    skillContainer = document.getElementById('skill-list');
    toolsContainer = document.getElementById('tools');
    basicInfoContainer = document.getElementById('basic-info');
    trainingCertificationContainer = document.getElementById('training-certification-list');
    educationContainer = document.getElementById('education');
    profilePhoto = document.getElementById('profile-photo');
    qrCodeCanvas = document.getElementById('qr-code'),
    qrCodeContainer = document.getElementById('qr-code-container');


    drawQRCode();
    fetchData();
}

window.onresize = () => {
    drawQRCode();
}

const formatTextToHTML = (inputValue) => {
    let transformValue = inputValue.replace(/\[/g, '<').replace(/\]/g, '>').replace(/\\[n]/g, '<br>');

    return transformValue;
};

const drawQRCode = () => {
    qrCodeContainerWidth = $(qrCodeContainer).get(0).clientWidth - 16;

    $(qrCodeCanvas).html('').qrcode({height: qrCodeContainerWidth, width: qrCodeContainerWidth, text: window.location.href});
};

const fetchData = () => {
    xhr = new XMLHttpRequest();
    xhr.onreadystatechange  = () => {
        if (xhr.readyState === 4 && xhr.status === 200) {
            response = JSON.parse(xhr.responseText);

            $(fullName).html(response.fullName);
            $(title).html(response.title);

            /* Contact */
            stringBuilderArray = [];
            $(contactContainer).html('');
            response.contact.forEach((item, index) => {
                stringBuilderArray.push('<span class="fa fa-' + item.icon + '"></span> ' + item.value + ' ');
            });
            $(contactContainer).append(stringBuilderArray.join('<br>'));


            /* About */
            $(aboutContainer).html(formatTextToHTML(response.about));


            /* Basic Info */
            stringBuilderArray = [];
            $(basicInfoContainer).html('');
            response.basicInfo.forEach((item, index) => {
                stringBuilderArray.push(
                    '<tr>' +
                    '   <td class="text-right" style="width: 50%"><strong>' + item.name + '</strong></td>' +
                    '   <td style="width: 50%">' + item.value + '</td>' +
                    '</tr>'
                );
            });
            $(basicInfoContainer).append(stringBuilderArray.join(''));


            /* Skills */
            stringBuilderArray = [];
            $(skillContainer).html('');
            response.skills.forEach((item, index) => {
                stringBuilderArray.push(
                    '<div class="col-sm-12 skill-container">' +
                    '    <p class="my-2">' + item.name + '</p>' +
                    '    <div class="progress">' +
                    '        <div class="progress-bar progress-bar-striped" role="progressbar" style="width: ' + item.value + '%" aria-valuenow="' + item.value + '" aria-valuemin="0" aria-valuemax="100"></div>' +
                    '    </div>' +
                    '</div>'
                );
            });
            $(skillContainer).append(stringBuilderArray.join(''));


            /* Tools */
            stringBuilderArray = [];
            $(toolsContainer).html('');
            response.tools.forEach((item, index) => {
                stringBuilderArray.push(
                    '<li>' + item + '</li>'
                );
            });
            $(toolsContainer).append(stringBuilderArray.join(''));

            /* Training and Certification */
            stringBuilderArray = [];
            $(trainingCertificationContainer).html('');
            response.trainingAndCertification.forEach((item, index) => {
                let dateFormat = dateDisplayMap[item.displayDateType];
                stringBuilderArray.push(
                    '<div class="media">' +
                    '    <div class="media-body">' +
                    '        <div class="row">' +
                    '            <div class="col-sm-8">' +
                    '                <h5 class="mt-0">' + item.title + '</h5>' +
                    '                <p>' + item.description + '</p>' +
                    '            </div>' +
                    '            <div class="col-sm-4">' +
                    '                <p class="lead text-right">' + item.from.utility().convertDatetime(dateFormat) + (item.isRangeDate ? (item.to.length ? (' - ' + item.to.toString().utility().convertDatetime(dateFormat)) : ' - Sekarang') : '') + '</p>' +
                    '            </div>' +
                    '        </div>' +
                    '    </div>' +
                    '</div>'
                );
            });
            $(trainingCertificationContainer).append(stringBuilderArray.join(''));

            /* Education */
            stringBuilderArray = [];
            $(educationContainer).html('');
            response.education.forEach((item, index) => {
                let dateFormat = dateDisplayMap[item.displayDateType];

                stringBuilderArray.push(
                    '<div class="media education-item">' +
                    '    <div class="media-body">' +
                    '        <div class="row">' +
                    '            <div class="col-sm-8">' +
                    '                <h5 class="mt-0">' + item.title + '</h5>' +
                    '                <p class="education-item-description">' + formatTextToHTML(item.description) + '</p>' +
                    '            </div>' +
                    '            <div class="col-sm-4">' +
                    '                <p class="lead text-right">' + item.from.utility().convertDatetime(dateFormat) + (item.isRangeDate ? (item.to.length ? (' - ' + item.to.toString().utility().convertDatetime(dateFormat)) : ' - Sekarang') : '') + '</p>' +
                    '            </div>' +
                    '        </div>' +
                    '    </div>' +
                    '</div>'
                );
            });
            $(educationContainer).append(stringBuilderArray.join(''));

            $(profilePhoto).attr('src', 'assets/img/profile/' + response.photo);

            /* Experience */
            stringBuilderArray = [];
            $(experienceContainer).html('');
            response.experiences.forEach((item, index) => {
                let workDone = [];
                let expDateDisplayType;
                let dateFormat = dateDisplayMap[item.displayDateType];

                item.workDone.forEach((val, idx) => {
                    let workDoneDateFormat = dateDisplayMap[val.displayDateType]
                    workDone.push(
                        '<div class="media mt-3 project-item">' +
                        '    <img src="assets/img/icons8-project-50.png" class="mr-3 img-project" alt="Project" style="width: 50px">' +
                        '    <div class="media-body">' +
                        '        <div class="row">' +
                        '            <div class="col-sm-6">' +
                        '                <h5 class="mt-0">' + val.title + '</h5>' +
                        '            </div>' +
                        '            <div class="col-sm-6">' +
                        '                <p class="lead text-right">' + val.from.utility().convertDatetime(workDoneDateFormat) + (val.isRangeDate ? (val.to.length ? (' - ' + val.to.toString().utility().convertDatetime(workDoneDateFormat)) : ' - Sekarang') : '') + '</p>' +
                        '            </div>' +
                        '        </div>' + formatTextToHTML(val.description) +
                        '    </div>' +
                        '</div>'
                    );
                });

                stringBuilderArray.push(
                    '<div class="media my-4">' +
                    '    <img src="assets/img/office/' + item.image + '" class="mr-3 work-place" alt="Work Place Icon" style="width: 100px">' +
                    '    <div class="media-body">' +
                    '        <div class="row">' +
                    '            <div class="col-sm-6">' +
                    '                <h5 class="mt-0">' + item.officeName + '</h5>' +
                    '                <p>' + item.title + '</p>' +
                    '            </div>' +
                    '            <div class="col-sm-6">' +
                    '                <p class="lead text-right">' + item.from.utility().convertDatetime(dateFormat) + (item.isRangeDate ? (item.to.length ? (' - ' + item.to.toString().utility().convertDatetime(dateFormat)) : ' - Sekarang') : '') + '</p>' +
                    '            </div>' +
                    '        </div>' +

                    '        <p>' + formatTextToHTML(item.description) + '</p>' +
                    '        <div class="project-container">' + workDone.join('') + '</div>' +

                    '    </div>' +
                    '</div>'
                );
            });

            console.log(stringBuilderArray);

            $(experienceContainer).append(stringBuilderArray.join(''));
        }
    }
    xhr.open('GET', 'assets/app/data.json', true);
    xhr.send();
}