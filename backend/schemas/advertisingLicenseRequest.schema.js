export default {
    advertisingLicenseRequestSchema: {
        "definitions": {},
        "$schema": "http://json-schema.org/draft-07/schema#",
        "$id": "https://example.com/object1705116733.json",
        "title": "Root",
        "type": "object",
        "required": [
            "adBoard",
            "companyInfo",
            "user_id",
            "adContent",
            "adImage",
            "startDate",
            "endDate"
        ],
        "properties": {
            "adBoard": {
                "$id": "#root/adBoard",
                "title": "Adboard",
                "type": "string",
                "default": "",
                "pattern": "^.*$"
            },
            "companyInfo": {
                "$id": "#root/companyInfo",
                "title": "Companyinfo",
                "type": "object",
                "required": [
                    "name",
                    "contact"
                ],
                "properties": {
                    "name": {
                        "$id": "#root/companyInfo/name",
                        "title": "Name",
                        "type": "string",
                        "default": "",
                        "pattern": "^.*$"
                    },
                    "contact": {
                        "$id": "#root/companyInfo/contact",
                        "title": "Contact",
                        "type": "object",
                        "required": [
                            "email",
                            "phone",
                            "address"
                        ],
                        "properties": {
                            "email": {
                                "$id": "#root/companyInfo/contact/email",
                                "title": "Email",
                                "type": "string",
                                "default": "",
                                "pattern": "^.*$"
                            },
                            "phone": {
                                "$id": "#root/companyInfo/contact/phone",
                                "title": "Phone",
                                "type": "string",
                                "default": "",
                                "pattern": "^.*$"
                            },
                            "address": {
                                "$id": "#root/companyInfo/contact/address",
                                "title": "Address",
                                "type": "string",
                                "default": "",
                                "pattern": "^.*$"
                            }
                        }
                    }

                }
            }
            ,
            "user_id": {
                "$id": "#root/user_id",
                "title": "User_id",
                "type": "string",
                "default": "",
                "pattern": "^.*$"
            },
            "adContent": {
                "$id": "#root/adContent",
                "title": "Adcontent",
                "type": "string",
                "default": "",
                "pattern": "^.*$"
            },
            "adImage": {
                "$id": "#root/adImage",
                "title": "Adimage",
                "type": "array",
                "default": [],
                "items": {
                    "$id": "#root/adImage/items",
                    "title": "Items",
                    "type": "string",
                    "default": "",
                    "pattern": "^.*$"
                }
            },
            "startDate": {
                "$id": "#root/startDate",
                "title": "Startdate",
                "type": "string",
                "default": "",
                "pattern": "^.*$"
            },
            "endDate": {
                "$id": "#root/endDate",
                "title": "Enddate",
                "type": "string",
                "default": "",
                "pattern": "^.*$"
            },
            "status": {
                "$id": "#root/status",
                "title": "Status",
                "type": "string",
                "default": "",
                "pattern": "^.*$"
            }
        }
    }

}