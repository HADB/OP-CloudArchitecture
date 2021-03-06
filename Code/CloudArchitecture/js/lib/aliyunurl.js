// Generated by CoffeeScript 1.7.1
$(function () {
    var generateEcsUrl, generatePostpaidUrl, generatePrepaidUrl, generateRdsUrl;
    generatePrepaidUrl = function (options) {
        var basestring, basestringJson, baseurl, disks, url, _options;
        url = '';
        baseurl = "http://buy.aliyun.com/vm?data=";
        _options = {
            type: 'ecs',
            data: {
                cpu: 1,
                ram: 1,
                disk: [],
                quantity: 1,
                bandwidth: 1,
                os: "",
                region_no: resources.regionCode[$.cookie('regionId')],
                duration: 2,
                vm_yundun_monitor: 1,
                vm_yundun_service: 1
            }
        };
        $.extend(_options, options);
        if (_options.data.duration % 12 === 0) {
            _options.data.duration /= 12;
            _options.data.cycle = "year";
        } else {
            _options.data.cycle = "month";
        }
        disks = [];
        _options.data.disk.each(function (disk_item) {
            if (disk_item.type !== 'system' && disk_item.size > 0) {
                disks.push({
                    type: "vm_" + disk_item.type + "_storage",
                    size: "" + disk_item.size,
                    vm_snapshot_id: null
                });
            }
        });
        basestring = {
            commodityCode: "vm",
            data: {
                vm_cpu: "" + _options.data.cpu,
                vm_ram: "" + _options.data.ram,
                vm_disk: disks,
                quantity: "" + _options.data.quantity,
                vm_bandwidth: "" + (_options.data.bandwidth * 1024),
                vm_os: "" + _options.data.os,
                vm_os_bit: "" + (tools.getOsBit(_options.data.os)),
                vm_region_no: "" + _options.data.region_no,
                duration: "" + _options.data.duration,
                pricing_cycle: "" + _options.data.cycle,
                vm_yundun_monitor: "1",
                vm_yundun_service: "1",
                display_name: "" + _options.data.name
            },
            os_type: "" + (tools.getImageType(_options.data.os))
        };
        basestringJson = $.toJSON(basestring);
        console.log(basestringJson);
        return url = baseurl + btoa(basestringJson);
    };
    generatePostpaidUrl = function (options) {
        var baseurl, diskAmount, param, params, url;
        url = '';
        baseurl = "http://buy.aliyun.com/ecs?data=";
        diskAmount = 0;
        options.data.disk.each(function (diskItem) {
            if (diskItem.type !== 'system') {
                return diskAmount += diskItem.size;
            }
        });
        param = {
            account: options.data.quantity,
            bandValue: options.data.bandwidth,
            mirror: null,
            region: resources.regionCode[$.cookie('regionId')],
            sysClass: tools.getSysClass(options.data.os),
            yundun: true,
            zone: null,
            bandType: {
                text: '',
                value: '0'
            },
            cpu: {
                text: '',
                value: '' + options.data.cpu
            },
            disk: diskAmount,
            os: {
                enable: '1',
                sysText: '',
                value: options.data.os,
                verText: ''
            },
            ram: {
                enable: '1',
                text: '',
                value: '' + options.data.ram
            }
        };
        params = btoa($.toJSON([param]));
        return url = baseurl + params;
    };
    generateEcsUrl = function (options) {
        var url;
        if (options.data.chargetype === 1) {
            url = generatePrepaidUrl(options);
        } else {
            url = generatePostpaidUrl(options);
        }
        return url;
    };
    generateRdsUrl = function (options) {
        var basestring, baseurl, url, _options;
        url = '';
        baseurl = 'http://buy.aliyun.com/rds?data=';
        _options = {
            data: {
                dbtype: "",
                dbversion: "",
                storage: 0,
                ram: 0,
                region: "cn-hangzhou-dg-a01",
                amount: 1,
                duration: 1
            }
        };
        $.extend(_options, options);
        basestring = ['[{', '"currentDB":"', _options.data.dbtype, '",', '"currentDBVer":"', _options.data.dbversion, '",', '"currentStorage":', _options.data.storage, ',', '"currentRam":"', _options.data.ram, '",', '"currentRegion":"', _options.data.region, '",', '"currentAccount":', _options.data.amount, ',', '"currentDuration":', _options.data.duration, '}]'].join('');
        return url = baseurl + btoa(basestring);
    };
    $.aliyun = {};
    $.aliyun.url = function (options) {

        /*
         *options:
         {
           type: 'ecs',
           data: {
             cpu: 2,
             ram: 2,
             disk: [ 100, 2000],
             quantity: 1,
             bandwidth: 100,
             os: "centos5u4_32_20G_alibase_20130816.vhd",
             region_no: "cn-hangzhou-dg-a01",
             duration: 2,
             vm_yundun_monitor: 1,
             vm_yundun_service: 1
           }
         }
         */
        var result;
        switch (options.type) {
            case 'ecs':
                result = generateEcsUrl(options);
                break;
            case 'rds':
                result = generateRdsUrl(options);
        }
        return result;
    };
});
