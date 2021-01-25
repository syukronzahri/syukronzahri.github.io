/**
 * String Utility
 * A small tool that can convert string data
 * @author Syukron Zahri
 * @version 1.0.2
 */
String.prototype.utility = function () {
    let stringData = this;

    return {
        convertDatetime: function (to, from) {
            let inputDateString = stringData;

            let originalDate = {
                year: 0,
                month: 0,
                day: 0,
                hour: 0,
                minute: 0,
                second: 0
            };

            const toUpperCaseFirst = inputString => {
                return inputString.charAt(0).toUpperCase() + inputString.slice(1);
            };

            const charMap = {
                Y: ['year', input => {
                    return input.toString();
                }],
                m: ['month', input => {
                    return input.toString().utility().leftPad('0', 2);
                }],
                n: ['month', input => {
                    return input.toString();
                }],
                F: ['month', input => {
                    return ''.utility().monthName(input - 1);
                }],
                M: ['month', input => {
                    return ''.utility().monthName(input - 1).substr(0, 3);
                }],
                d: ['day', input => {
                    return input.toString().utility().leftPad('0', 2);
                }],
                j: ['day', input => {
                    return input.toString();
                }],
                H: ['hour', input => {
                    return input.toString().utility().leftPad('0', 2);
                }],
                i: ['minute', input => {
                    return input.toString().utility().leftPad('0', 2);
                }],
                s: ['second', input => {
                    return input.toString().utility().leftPad('0', 2);
                }],
            };

            // format [format character, regex, function to convert the source to variable]
            let format = {
                userDate: ['d-m-Y', /^\d{2}-\d{2}-\d{4}$/, input => {
                    const tempDate = input.split('-');
                    originalDate.day = Number.parseInt(tempDate[0]);
                    originalDate.month = Number.parseInt(tempDate[1]);
                    originalDate.year = Number.parseInt(tempDate[2]);
                    return originalDate;
                }],
                userLongMonthYear: ['F Y', /^[a-zA-Z]{3,} \d{4}$/, input => {
                    const tempDate = input.split(' ');
                    let monthIndex = 0;

                    let monthName = ''.utility().monthName();

                    for (let i = 0; i < monthName.length; i++) {
                        if (tempDate[0].toLowerCase() === monthName[i].toLowerCase()) {
                            monthIndex = i;
                        }
                    }

                    originalDate.day = (new Date()).getDay();
                    originalDate.month = monthIndex;
                    originalDate.year = Number.parseInt(tempDate[1]);
                    return originalDate;
                }],
                year: ['Y', /^\d{4}$/, input => {
                    let today = new Date();

                    originalDate.day = today.getDay();
                    originalDate.month = today.getMonth() + 1;
                    originalDate.year = Number.parseInt(input);
                    return originalDate;
                }],
                userDateLongMonthFull: ['d F Y', /^\d{2} [a-zA-Z]{3,} \d{4}$/, input => {
                    let tempDate = input.split(' ');
                    originalDate.day = Number.parseInt(tempDate[0]);
                    let monthIndex = 0;

                    let monthName = ''.utility().monthName();

                    for (let i = 0; i < monthName.length; i++) {
                        if (tempDate[1].toLowerCase() === monthName[i].toLowerCase()) {
                            monthIndex = i;
                        }
                    }

                    originalDate.month = monthIndex;
                    originalDate.year = Number.parseInt(tempDate[2]);
                    return originalDate;
                }],
                userDateLongMonthPartial: ['d M Y', /^\d{2} [a-zA-Z]{3} \d{4}$/, input => {
                    let tempDate = input.split(' ');
                    originalDate.day = Number.parseInt(tempDate[0]);
                    let monthIndex = 0;

                    let monthName = ''.utility().monthName();

                    for (let i = 0; i < monthName.length; i++) {
                        if (tempDate[1].toLowerCase() === monthName[i].toLowerCase().substr(0, 3)) {
                            monthIndex = i;
                        }
                    }

                    originalDate.month = monthIndex;
                    originalDate.year = Number.parseInt(tempDate[2]);
                    return originalDate;
                }],
                userDateTimeLongMonthFull: ['d F Y H:i:s', /^\d{2} [a-zA-Z]{3,} \d{4} \d{2}:\d{2}:\d{2}$/, input => {
                    const tempDate = input.split(' ');
                    const timePart = timePart[3].split(':');
                    originalDate.day = Number.parseInt(tempDate[0]);
                    let monthIndex = 0;
                    let monthName = ''.utility().monthName();

                    for (let i = 0; i < monthName.length; i++) {
                        if (tempDate[1].toLowerCase() === monthName[i].toLowerCase()) {
                            monthIndex = i;
                        }
                    }

                    originalDate.month = monthIndex;
                    originalDate.year = Number.parseInt(tempDate[2]);
                    originalDate.hour = timePart[0];
                    originalDate.minute = timePart[1];
                    originalDate.second = timePart[2];
                    return originalDate;
                }],
                userDateTimeLongMonthPartial: ['d M Y H:i:s', /^\d{2} [a-zA-Z]{3} \d{4} \d{2}:\d{2}:\d{2}$/, input => {
                    let tempDate = input.split(' ');
                    let timePart = timePart[3].split(':');
                    originalDate.day = Number.parseInt(tempDate[0]);
                    let monthIndex = 0;
                    let monthName = ''.utility().monthName();

                    for (let i = 0; i < monthName.length; i++) {
                        if (tempDate[1].toLowerCase() === monthName[i].toLowerCase().substr(0, 3)) {
                            monthIndex = i;
                        }
                    }

                    originalDate.month = monthIndex;
                    originalDate.year = Number.parseInt(tempDate[2]);
                    originalDate.hour = timePart[0];
                    originalDate.minute = timePart[1];
                    originalDate.second = timePart[2];
                    return originalDate;
                }],
                userDateTimeLong: ['d-m-Y H:i:s', /^\d{2}-\d{2}-\d{4} \d{2}:\d{2}:\d{2}$/, input => {
                    let tempDate = input.split(' ');
                    let dayPart = tempDate[0].split('-');
                    let timePart = tempDate[1].split(':');
                    originalDate.day = Number.parseInt(dayPart[0]);
                    originalDate.month = Number.parseInt(dayPart[1]);
                    originalDate.year = Number.parseInt(dayPart[2]);
                    originalDate.hour = Number.parseInt(timePart[0]);
                    originalDate.minute = Number.parseInt(timePart[1]);
                    originalDate.second = Number.parseInt(timePart[2]);
                    return originalDate;
                }],
                userDateTimePartial: ['d-m-Y H:i', /^\d{2}-\d{2}-\d{4} \d{2}:\d{2}$/, input => {
                    let tempDate = input.split(' ');
                    let dayPart = tempDate[0].split('-');
                    let timePart = tempDate[1].split(':');
                    originalDate.day = Number.parseInt(dayPart[0]);
                    originalDate.month = Number.parseInt(dayPart[1]);
                    originalDate.year = Number.parseInt(dayPart[2]);
                    originalDate.hour = Number.parseInt(timePart[0]);
                    originalDate.minute = Number.parseInt(timePart[1]);
                    return originalDate;
                }],
                systemDate: ['Y-m-d', /^\d{4}-\d{2}-\d{2}$/, function(input){
                    let tempDate = input.split('-');
                    originalDate.day = Number.parseInt(tempDate[2]);
                    originalDate.month = Number.parseInt(tempDate[1]);
                    originalDate.year = Number.parseInt(tempDate[0]);
                    return originalDate;
                }],
                systemDateTime: ['Y-m-d H:i:s', /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/, input => {
                    let tempDate = input.split(' ');
                    let dayPart = tempDate[0].split('-');
                    let timePart = tempDate[1].split(':');
                    originalDate.day = Number.parseInt(dayPart[2]);
                    originalDate.month = Number.parseInt(dayPart[1]);
                    originalDate.year = Number.parseInt(dayPart[0]);
                    originalDate.hour = Number.parseInt(timePart[0]);
                    originalDate.minute = Number.parseInt(timePart[1]);
                    originalDate.second = Number.parseInt(timePart[2]);
                    return originalDate;
                }],
                time: ['H:i:s', /^\d{2}:\d{2}:\d{2}$/, input => {
                    let tempDate = input;
                    let timePart = tempDate.split(':');
                    originalDate.hour = Number.parseInt(timePart[0]);
                    originalDate.minute = Number.parseInt(timePart[1]);
                    originalDate.second = Number.parseInt(timePart[2]);
                    return originalDate;
                }],
            };

            let fromFormat;

            if (from === undefined) {
                for (let k in format) {
                    if (inputDateString.match(format[k][1])) {
                        fromFormat = k;
                    }
                }
            } else {
                fromFormat = from;
            }

            if (inputDateString.length === 0) {
                return '';
            } else {
                format[fromFormat][2](inputDateString);
            }


            let toFormat = to,
                dateBuilder = '',
                toFormatCode = format[toFormat][0];

            for (let i = 0; i < toFormatCode.length; i++) {
                let character = toFormatCode[i];
                if (typeof charMap[character] != 'undefined') {
                    dateBuilder += charMap[character][1](originalDate[charMap[character][0]]);
                } else {
                    dateBuilder += character;
                }
            }

            return dateBuilder;
        },
        dateTimeConstant: {
            userDate: 'userDate',
            userLongMonthYear: 'userLongMonthYear',
            userDateLongMonthFull: 'userDateLongMonthFull',
            userDateLongMonthPartial: 'userDateLongMonthPartial',
            userDateTimeLongMonthFull: 'userDateTimeLongMonthFull',
            userDateTimeLongMonthPartial: 'userDateTimeLongMonthPartial',
            userDateTimeLong: 'userDateTimeLong',
            userDateTimePartial: 'userDateTimePartial',
            systemDate: 'systemDate',
            systemDateTime: 'systemDateTime',
            time: 'time',
        },
        getTerbilang: options => {
            let inputNumber = Number.parseInt(stringData),
                isCurrency = false,
                commaText = ' Koma ',
                centText = '',
                useDecimalScale = false,
                currencyText = '';

            if (options !== undefined) {
                if (options.isCurrency === true) {
                    isCurrency = true;
                    currencyText = ' Rupiah';
                    if (options.currencyText !== undefined) {
                        currencyText = options.currencyText;
                    }
                    centText = ' Sen';
                    commaText = ' ';
                }

                if (options.useScale !== undefined) {
                    useDecimalScale = options.useScale;
                }
            }

            if (isNaN(inputNumber)) return '';
            if (inputNumber < 0) return '';

            let wholePart = stringData.split('.')[0],
                decimalPart = stringData.split('.')[1];

            let bilangan = ['Nol', 'Satu', 'Dua', 'Tiga', 'Empat', 'Lima', 'Enam', 'Tujuh', 'Delapan', 'Sembilan', 'Sepuluh', 'Sebelas'];

            function getBilangan(inNum, displayZero) {
                if (inNum === 0) {
                    if (displayZero !== undefined) {
                        if (displayZero === true) {
                            return bilangan[inNum];
                        } else {
                            return '';
                        }
                    } else {
                        return '';
                    }
                } else {
                    return bilangan[inNum];
                }
            }

            const getBilanganFromChar = x => {
                let trailingNumbers = '';

                if (x.length > 1) {
                    trailingNumbers = getBilanganFromChar(x.substring(1));
                }

                return (getBilangan(x.charAt(0)) + ' ' + trailingNumbers).replace(/\s+/, ' ');
            }

            const getRecursiveTerbilangInteger = x => {
                x = Math.abs(x);
                let retVal = '';

                if (x < 12) {
                    retVal += ' ' + getBilangan(x);
                } else if (x < 20) {
                    retVal += getRecursiveTerbilangInteger(x - 10) + ' Belas ';
                } else if (x < 100) {
                    retVal += getRecursiveTerbilangInteger(Math.floor(x / 10)) + ' Puluh ' + getRecursiveTerbilangInteger(x % 10);
                } else if (x < 200) {
                    retVal += ' Seratus ' + getRecursiveTerbilangInteger(x - 100);
                } else if (x < 1000) {
                    retVal += getRecursiveTerbilangInteger(Math.floor(x / 100)) + ' Ratus ' + getRecursiveTerbilangInteger(x % 100);
                } else if (x < 2000) {
                    retVal += ' Seribu ' + getRecursiveTerbilangInteger(x - 1000);
                } else if (x < 1000000) {
                    retVal += getRecursiveTerbilangInteger(Math.floor(x / 1000)) + ' Ribu ' + getRecursiveTerbilangInteger(x % 1000);
                } else if (x < 1000000000) {
                    retVal += getRecursiveTerbilangInteger(Math.floor(x / 1000000)) + ' Juta ' + getRecursiveTerbilangInteger(x % 1000000);
                } else if (x < 1000000000000) {
                    retVal += getRecursiveTerbilangInteger(Math.floor(x / 1000000000)) + ' Milyar ' + getRecursiveTerbilangInteger(x % 1000000000);
                } else if (x < 1000000000000000) {
                    retVal += getRecursiveTerbilangInteger(Math.floor(x / 1000000000000)) + ' Trilyun ' + getRecursiveTerbilangInteger(x % 1000000000000);
                }

                return retVal.replace(/\s+/, ' ').trim();
            }

            const getRecursiveTerbilangDecimal = x => {
                let decimal = x,
                    length = decimal.length,
                    decimalBuilder = '';

                for (let i = 0; i < length; i++) {
                    decimalBuilder += ' ' + getBilangan(parseInt(decimal[i]), true);
                }

                return decimalBuilder.replace(/\s+/, ' ').trim();
            }


            if (decimalPart !== undefined) {
                if (decimalPart.length) {
                    if (decimalPart.match(/^0+$/)) {
                        return getRecursiveTerbilangInteger(Number.parseInt(wholePart)) + (isCurrency ? currencyText : '');
                    } else {
                        return getRecursiveTerbilangInteger(Number.parseInt(wholePart)) + (isCurrency ? currencyText : '') + commaText + (useDecimalScale ? getRecursiveTerbilangDecimal(decimalPart.utility().trimRight('0')) : getRecursiveTerbilangInteger(decimalPart.utility().trimRight('0'))) + centText;
                    }
                } else {
                    return getRecursiveTerbilangInteger(Number.parseInt(wholePart)) + (isCurrency ? currencyText : '');
                }
            } else {
                return getRecursiveTerbilangInteger(Number.parseInt(wholePart)) + (isCurrency ? currencyText : '') ;
            }
        },
        numberFormat: (decimalLength, thousandLength, thousandSeparatorSymbol, decimalSymbol) => {
            let numberData = (stringData.indexOf('.') >= 0) ? Number.parseFloat(stringData) : Number.parseInt(stringData);

            let re = '\\d(?=(\\d{' + (thousandLength || 3) + '})+' + (decimalLength > 0 ? '\\D' : '$') + ')',
                num = numberData.toFixed(Math.max(0, ~~decimalLength));

            return (decimalSymbol ? num.replace('.', decimalSymbol) : num).replace(new RegExp(re, 'g'), '$&' + (thousandSeparatorSymbol || ','));
        },
        leftPad: (char, length) => {
            return char.repeat(Math.max(0, length - stringData.length)) + stringData;
        },
        rightPad: (char, length) => {
            return stringData + char.repeat(Math.max(0, length - stringData.length));
        },
        removeBackSlashQuote: () => {
            return stringData.replace(/\\\'/g, "'");
        },
        monthName: number => {
            let month = [
                'Januari',
                'Februari',
                'Maret',
                'April',
                'Mei',
                'Juni',
                'Juli',
                'Agustus',
                'September',
                'Oktober',
                'November',
                'Desember'
            ];

            if (number === undefined) {
                return month;
            } else {
                return month[number];
            }
        },
        isNullDate: () => {
            if (stringData === '0000-00-00') {
                return true;
            }
        },
        getTodayDate: type => {
            let todayDate = new Date();
            return todayDate.getFullYear().toString() + '-' + todayDate.getMonth().toString().utility().leftPad('0', 2) + '-' + todayDate.getDate().toString().utility().leftPad('0', 2);
        },
        trimLeft: character => {
            if (character === undefined)
                character = "\\s";

            return stringData.replace(new RegExp("^[" + character + "]+"), "");
        },
        trimRight: character => {
            if (character === undefined)
                character = "\\s";

            return stringData.replace(new RegExp("[" + character + "]+$"), "");
        },
        trim: charlist => {
            return stringData.trimLeft(charlist).trimRight(charlist);
        },
    };
}