export default{
    report_schema:{
        "definitions": {},
        "$schema": "http://json-schema.org/draft-07/schema#", 
        "$id": "https://example.com/object1705201185.json", 
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
                "$id": "#root/type", 
                "title": "Type", 
                "type": "string",
                "default": "",
                "examples": [
                    "planned location"
                ],
                "pattern": "^.*$"
            },
            "reportType": {
                "$id": "#root/reportType", 
                "title": "Reporttype", 
                "type": "string",
                "default": "",
                "examples": [
                    "Đăng ký nội dung"
                ],
                "pattern": "^.*$"
            },
            "senderName": {
                "$id": "#root/senderName", 
                "title": "Sendername", 
                "type": "string",
                "default": "",
                "examples": [
                    "Phuoc"
                ],
                "pattern": "^.*$"
            },
            "email": {
                "$id": "#root/email", 
                "title": "Email", 
                "type": "string",
                "default": "",
                "examples": [
                    "nguyennhuphuoc2002@gmail.com"
                ],
                "pattern": "^.*$"
            },
            "phone": {
                "$id": "#root/phone", 
                "title": "Phone", 
                "type": "string",
                "default": "",
                "examples": [
                    "0868282427"
                ],
                "pattern": "^.*$"
            },
            "reportContent": {
                "$id": "#root/reportContent", 
                "title": "Reportcontent", 
                "type": "string",
                "default": "",
                "examples": [
                    "Tôi muốn đặt bảng quảng cáo ở đây"
                ],
                "pattern": "^.*$"
            }
        }
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