export default{
    report_schema:{
        "definitions": {},
        "$schema": "http://json-schema.org/draft-07/schema#", 
        "$id": "https://example.com/object1705047088.json", 
        "title": "Root", 
        "type": "object",
        "required": [
            "type",
            "reportType",
            "senderName",
            "email",
            "phone",
            "reportContent"

        ],
        "properties": {
            "type": {
                "$id": "#root/district", 
                "title": "District", 
                "type": "string",
                "default": "",
               
                "pattern": "^.*$"
            },
            "reportType": {
                "$id": "#root/name", 
                "title": "Name", 
                "type": "string",
                "default": "",
               
                "pattern": "^.*$"
            },
            "senderName": {
                "$id": "#root/name", 
                "title": "Name", 
                "type": "string",
                "default": "",
               
                "pattern": "^.*$"
            },
            "email": {
                "$id": "#root/name", 
                "title": "Name", 
                "type": "string",
                "default": "",
               
                "pattern": "^.*$"
            },
            "phone": {
                "$id": "#root/name", 
                "title": "Name", 
                "type": "string",
                "default": "",
               
                "pattern": "^.*$"
            },
            "reportContent": {
                "$id": "#root/name", 
                "title": "Name", 
                "type": "string",
                "default": "",
               
                "pattern": "^.*$"
            }
            
        },
    },
    report_update_schema:{
        "definitions": {},
        "$schema": "http://json-schema.org/draft-07/schema#", 
        "$id": "https://example.com/object1705047088.json", 
        "title": "Root", 
        "type": "object",
        "required": [
            "processMethod"
        ],
        "properties": {         
            "processMethod": {
                "$id": "#root/name", 
                "title": "Name", 
                "type": "string",
                "default": "",              
                "pattern": "^.*$"
            }
        },
    },
}