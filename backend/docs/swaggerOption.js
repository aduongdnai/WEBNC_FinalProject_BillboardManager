export default {
  "definition": {
    "openapi": "3.0.0",
    "info": {
      "title": "Sakila API",
      "version": "1.0.0",
      "description": "API for managing ad locations, boards, reports, users, and more."
    },
    "servers": [
      {
        "url": "http://127.0.0.1:5000/api/v1"
      }
    ],
    "tags": [
      {
        "name": "Authentication"
      },
      {
        "name": "AdLocation"
      },
      {
        "name": "AdBoard"
      },
      {
        "name": "User"
      },
      {
        "name": "Advertising License Request"
      },
      {
        "name": "District"
      },
      {
        "name": "Ward"
      },
      {
        "name": "Advertising Type"
      },
      {
        "name": "Ad Board Edit Request"
      },
      {
        "name": "Ad Location Edit Request"
      },
      {
        "name": "Report Type"
      },
      {
        "name": "Report"
      }
    ],
    "paths": {
      "/auth/login": {
        "post": {
          "summary": "User login",
          "tags": [
            "Authentication"
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "email": {
                      "type": "string",
                      "example": "duong2162002@gmail.com"
                    },
                    "password": {
                      "type": "string",
                      "example": "12345678"
                    }
                  }
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Login Success"
            },
            "400": {
              "description": "Bad Request"
            },
            "401": {
              "description": "Unauthorized"
            },
            "500": {
              "description": "Internal Server Error"
            }
          }
        }
      },
      "/auth/logout": {
        "get": {
          "summary": "User logout",
          "tags": [
            "Authentication"
          ],
          "responses": {
            "200": {
              "description": "Logout Success"
            },
            "500": {
              "description": "Internal Server Error"
            }
          }
        }
      },
      "/auth/signup": {
        "post": {
          "summary": "Creata account for ward/district officials",
          "tags": [
            "Authentication"
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/User"
                },
                "examples": {
                  "userExample": {
                    "summary": "Example of an user object",
                    "value": {
                      "username": "Nguyen Tran Dai Duong",
                      "password": "12345678",
                      "email": "duong2162002@gmail.com",
                      "role": "CB-Phuong",
                      "ward": "4",
                      "district": "5"
                    }
                  }
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": "Created"
            },
            "400": {
              "description": "Bad Request"
            },
            "500": {
              "description": "Internal Server Error"
            }
          }
        }
      },
      "/adlocations/": {
        "get": {
          "summary": "Get all ad locations",
          "tags": [
            "AdLocation"
          ],
          "responses": {
            "200": {
              "description": "Get all ad locations success"
            },
            "500": {
              "description": "Internal Server Error"
            }
          }
        },
        "post": {
          "summary": "Create a new ad location",
          "tags": [
            "AdLocation"
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/AdLocation"
                },
                "examples": {
                  "AdLocationExample": {
                    "summary": "Example of an adlocation object",
                    "value": {
                      "address": "ATM Ngân hàng Á Châu, Hùng Vương, Phường 1, Quận 10, Hồ Chí Minh",
                      "area": "Phường 1, Quận 10, Hồ Chí Minh",
                      "locationType": "Đất tư nhân/Nhà ở riêng lẻ",
                      "advertisingType": "Quảng cáo thương mại",
                      "image": "official/c6huqkttfeesmh4lcc6h",
                      "planned": false,
                      "coordinates": {
                        "type": "Point",
                        "coordinates": [
                          106.68112930700005,
                          10.765307268000072
                        ]
                      }
                    }
                  }
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Ad Location Created Success"
            },
            "500": {
              "description": "Internal Server Error"
            }
          }
        }
      },
      "/adlocations/{id}": {
        "get": {
          "summary": "Get ad location by ID",
          "tags": [
            "AdLocation"
          ],
          "parameters": [
            {
              "name": "id",
              "description": "AdLocation ID",
              "in": "path",
              "required": true,
              "schema": {
                "type": "string",
                "example": "658294b1bbae348611e43bfe"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Get ad location Success"
            },
            "400": {
              "description": "Bad Request"
            },
            "500": {
              "description": "Internal Server Error"
            }
          }
        }
      },
      "/adboards/": {
        "post": {
          "summary": "Create a new ad board",
          "tags": [
            "AdBoard"
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/AdBoard"
                },
                "examples": {
                  "AdBoardExample": {
                    "summary": "Example of an adboard object",
                    "value": {
                      "location_id": "65829566bbae348611e43c02",
                      "boardType": "Trụ hộp đèn",
                      "width": 12,
                      "height": 10,
                      "images": [
                        "official/c6huqkttfeesmh4lcc6h"
                      ],
                      "expiryDate": null,
                      "advertisingLicense_id": null
                    }
                  }
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Add Ad Board Success"
            },
            "500": {
              "description": "Internal Server Error"
            }
          }
        }
      },
      "/adboards/{id}": {
        "get": {
          "summary": "Get ad board by Ad Location ID",
          "tags": [
            "AdBoard"
          ],
          "parameters": [
            {
              "name": "id",
              "description": "Ad Location ID",
              "in": "path",
              "required": true,
              "schema": {
                "type": "string",
                "example": "65829566bbae348611e43c02"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Get AdBoards Success"
            },
            "500": {
              "description": "Internal Server Error"
            }
          }
        },
        "patch": {
          "summary": "Update ad board by ID",
          "tags": [
            "AdBoard"
          ],
          "parameters": [
            {
              "name": "id",
              "description": "Ad Board ID",
              "in": "path",
              "required": true,
              "schema": {
                "type": "string"
              }
            }
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "examples": {
                  "AdBoardExample": {
                    "summary": "Example of an adboard object",
                    "value": {
                      "boardType": "Trụ hộp đèn1",
                      "width": 10,
                      "height": 12,
                      "images": [
                        "official/c6huqkttfeesmh4lcc6h"
                      ]
                    }
                  }
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Update Ad Board Success"
            },
            "400": {
              "description": "Ad Board Not Found"
            },
            "500": {
              "description": "Internal Server Error"
            }
          }
        }
      },
      "/adboards/find/{id}": {
        "get": {
          "summary": "Get ad board by Ad Board ID",
          "tags": [
            "AdBoard"
          ],
          "parameters": [
            {
              "name": "id",
              "description": "Ad Board ID",
              "in": "path",
              "required": true,
              "schema": {
                "type": "string",
                "example": "65a09f6005b37563bf145910"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Get AdBoards Success"
            },
            "500": {
              "description": "Internal Server Error"
            }
          }
        }
      },
      "/report/": {
        "post": {
          "summary": "Create a new report",
          "tags": [
            "Report"
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/userReport"
                },
                "examples": {
                  "LocationReportExample": {
                    "summary": "Example of a Location Report object",
                    "value": {
                      "senderName": "Nguyễn Trần Đại Dương",
                      "time": "2024-01-10T09:40:18.856Z",
                      "reportType": "Giải đáp thắc mắc",
                      "type": "plannedLocation",
                      "area": "Phường 4, Quận 5, Hồ Chí Minh",
                      "email": "ocean2162002@gmail.com",
                      "phone": "0929179294",
                      "reportContent": "<p>Tại sao biển quảng cáo lại được đặt ở đây</p>",
                      "images": [
                        "report/blkljoa8ydmlzneqqqc6"
                      ],
                      "status": "Pending",
                      "longitude": 106.68224052800008,
                      "latitude": 10.764450687000021
                    }
                  },
                  "AdBoardReportExample": {
                    "summary": "Example of a AdBoard Report object",
                    "value": {
                      "senderName": "Nguyễn Trần Đại Dương",
                      "time": "2024-01-10T09:40:18.856Z",
                      "reportType": "Giải đáp thắc mắc",
                      "type": "plannedLocation",
                      "area": "Phường 4, Quận 5, Hồ Chí Minh",
                      "email": "ocean2162002@gmail.com",
                      "phone": "0929179294",
                      "reportContent": "<p>Tại sao biển quảng cáo lại được đặt ở đây</p>",
                      "images": [
                        "report/blkljoa8ydmlzneqqqc6"
                      ],
                      "status": "Pending",
                      "reference_id": "6582a64745b7528c3f429b7b"
                    }
                  }
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": "Created"
            },
            "409": {
              "description": "Conflict"
            }
          }
        },
        "get": {
          "summary": "Get all reports",
          "tags": [
            "Report"
          ],
          "responses": {
            "200": {
              "description": "Get all reports success"
            },
            "500": {
              "description": "Internal Server Error"
            }
          }
        }
      },
      "/report/{id}": {
        "put": {
          "summary": "Update report by ID",
          "tags": [
            "Report"
          ],
          "parameters": [
            {
              "name": "id",
              "description": "Report ID",
              "in": "path",
              "required": true,
              "schema": {
                "type": "string"
              }
            }
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "processMethod": {
                      "type": "string",
                      "example": "<p>Lên phường nộp 500k</p>"
                    },
                    "status": {
                      "type": "string",
                      "example": "Processed"
                    },
                    "updatedTime": {
                      "type": "string",
                      "example": "2024-01-10T14:56:06.758Z"
                    }
                  }
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Update Report Success"
            },
            "500": {
              "description": "Internal Server Error"
            }
          }
        },
        "get": {
          "tags": [
            "Report"
          ],
          "summary": "Get report by ID",
          "parameters": [
            {
              "name": "id",
              "description": "Report ID",
              "in": "path",
              "required": true,
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Get report success"
            },
            "500": {
              "description": "Internal Server Error"
            }
          }
        }
      },
      "/users/{id}": {
        "get": {
          "summary": "Get user by ID",
          "tags": [
            "User"
          ],
          "parameters": [
            {
              "name": "id",
              "description": "User ID",
              "in": "path",
              "required": true,
              "schema": {
                "type": "string",
                "example": "659a7efb6f98ab3b487afa66"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Get user success"
            },
            "500": {
              "description": "Internal Server Error"
            }
          }
        }
      },
      "/users/change-password/{id}": {
        "put": {
          "summary": "Change user password",
          "tags": [
            "User"
          ],
          "parameters": [
            {
              "name": "id",
              "description": "User ID",
              "in": "path",
              "required": true,
              "schema": {
                "type": "string",
                "example": "659a7efb6f98ab3b487afa66"
              }
            }
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "oldPassword": {
                      "type": "string",
                      "example": "12345678"
                    },
                    "newPassword": {
                      "type": "string",
                      "example": "123456789"
                    }
                  }
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Change User Password Success"
            },
            "400": {
              "description": "Bad Request"
            },
            "404": {
              "description": "Not Found"
            },
            "500": {
              "description": "Internal Server Error"
            }
          }
        }
      },
      "/users/resetpassword": {
        "post": {
          "summary": "Reset user password",
          "tags": [
            "User"
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "email": {
                      "type": "string",
                      "example": "duong2162002@gmail.com"
                    },
                    "resetToken": {
                      "type": "string",
                      "example": "RESETTOKEN"
                    }
                  }
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Reset password Success"
            },
            "400": {
              "description": "Bad Request"
            },
            "404": {
              "description": "Not Found"
            },
            "500": {
              "description": "Internal Server Error"
            }
          }
        }
      },
      "/district/": {
        "get": {
          "tags": [
            "District"
          ],
          "summary": "Get all districts",
          "responses": {
            "200": {
              "description": "Get All District Success"
            },
            "500": {
              "description": "Internal Server Error"
            }
          }
        },
        "post": {
          "tags": [
            "District"
          ],
          "summary": "Create a new district",
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "name": {
                      "type": "string",
                      "example": "Quận 14"
                    }
                  }
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": "Created"
            },
            "409": {
              "description": "Conflict"
            }
          }
        }
      },
      "/district/{id}": {
        "put": {
          "tags": [
            "District"
          ],
          "summary": "Update district by ID",
          "parameters": [
            {
              "name": "id",
              "description": "District ID",
              "in": "path",
              "required": true,
              "schema": {
                "type": "string"
              }
            }
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "name": {
                      "type": "string",
                      "example": "Quận 12"
                    }
                  }
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Get District Success"
            },
            "500": {
              "description": "Internal Server Error"
            }
          }
        },
        "delete": {
          "tags": [
            "District"
          ],
          "summary": "Delete district by ID",
          "parameters": [
            {
              "name": "id",
              "description": "District ID",
              "in": "path",
              "required": true,
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Delete District Success"
            },
            "500": {
              "description": "Internal Server Error"
            }
          }
        }
      },
      "/district/findDistrict": {
        "post": {
          "tags": [
            "District"
          ],
          "summary": "Find districts by name",
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "area": {
                      "type": "string",
                      "example": "Quận 12"
                    }
                  }
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Find districts by Name Success"
            },
            "500": {
              "description": "Internal Server Error"
            }
          }
        }
      },
      "/ward/": {
        "post": {
          "summary": "Create a new ward",
          "tags": [
            "Ward"
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "name": {
                      "type": "string",
                      "example": "Phường Đông Hưng Thuận"
                    },
                    "district": {
                      "type": "string",
                      "example": "Quận 12"
                    }
                  }
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": "Created"
            },
            "409": {
              "description": "Conflict"
            }
          }
        }
      },
      "/ward/findWard": {
        "post": {
          "summary": "Find wards by name and district",
          "tags": [
            "Ward"
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "area": {
                      "type": "string",
                      "example": "Phường Đông Hưng Thuận"
                    },
                    "district": {
                      "type": "string",
                      "example": "Quận 10"
                    }
                  }
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Find wards by name and district success"
            },
            "500": {
              "description": "Internal Server Error"
            }
          }
        }
      },
      "/ward/findByDistrict": {
        "post": {
          "summary": "Find wards by district",
          "tags": [
            "Ward"
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "district": {
                      "type": "string",
                      "example": "Quận 10"
                    }
                  }
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Find wards by district success"
            },
            "500": {
              "description": "Internal Server Error"
            }
          }
        }
      },
      "/ward/{id}": {
        "put": {
          "summary": "Update ward by ID",
          "tags": [
            "Ward"
          ],
          "parameters": [
            {
              "name": "id",
              "description": "Ward ID",
              "in": "path",
              "required": true,
              "schema": {
                "type": "string"
              }
            }
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "name": {
                      "type": "string",
                      "example": "Phường Tân Hưng Thuận"
                    }
                  }
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Update Ward Success"
            },
            "500": {
              "description": "Internal Server Error"
            }
          }
        },
        "delete": {
          "summary": "Delete ward by ID",
          "tags": [
            "Ward"
          ],
          "parameters": [
            {
              "name": "id",
              "description": "Ward ID",
              "in": "path",
              "required": true,
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Delete Ward Success"
            },
            "500": {
              "description": "Internal Server Error"
            }
          }
        }
      },
      "/advertisingType/": {
        "get": {
          "summary": "Get all advertising types",
          "tags": [
            "Advertising Type"
          ],
          "responses": {
            "200": {
              "description": "Get all advertising types success"
            },
            "500": {
              "description": "Internal Server Error"
            }
          }
        },
        "post": {
          "summary": "Create a new advertising type",
          "tags": [
            "Advertising Type"
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "name": {
                      "type": "string",
                      "example": "Cổ Động Văn Hóa2"
                    }
                  }
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": "Created"
            },
            "409": {
              "description": "Conflict"
            }
          }
        }
      },
      "/advertisingType/{id}": {
        "put": {
          "summary": "Update advertising type by ID",
          "tags": [
            "Advertising Type"
          ],
          "parameters": [
            {
              "name": "id",
              "description": "Advertising Type ID",
              "in": "path",
              "required": true,
              "schema": {
                "type": "string"
              }
            }
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "name": {
                      "type": "string",
                      "example": "Cổ động văn hóa 2"
                    }
                  }
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Update advertising type success"
            },
            "500": {
              "description": "Internal Server Error"
            }
          }
        },
        "delete": {
          "summary": "Delete advertising type by ID",
          "tags": [
            "Advertising Type"
          ],
          "parameters": [
            {
              "name": "id",
              "description": "Advertising Type ID",
              "in": "path",
              "required": true,
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Delete advertising type success"
            },
            "500": {
              "description": "Internal Server Error"
            }
          }
        }
      },
      "/advertisingType/findType": {
        "post": {
          "summary": "Find advertising types by name",
          "tags": [
            "Advertising Type"
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "area": {
                      "type": "string",
                      "example": "Cổ động văn hóa 2"
                    }
                  }
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Find advertising types by name success"
            },
            "500": {
              "description": "Internal Server Error"
            }
          }
        }
      },
      "/reportTypes/": {
        "get": {
          "summary": "Get all report types",
          "tags": [
            "Report Type"
          ],
          "responses": {
            "200": {
              "description": "Get all report types success"
            },
            "500": {
              "description": "Internal Server Error"
            }
          }
        },
        "post": {
          "summary": "Create a new report type",
          "tags": [
            "Report Type"
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "example": {
                  "name": "New Report Type"
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": "Created"
            },
            "409": {
              "description": "Conflict"
            },
            "500": {
              "description": "Internal Server Error"
            }
          }
        }
      },
      "/reportTypes/{id}": {
        "put": {
          "summary": "Update a report type by ID",
          "tags": [
            "Report Type"
          ],
          "parameters": [
            {
              "name": "id",
              "description": "Report Type ID",
              "in": "path",
              "required": true,
              "schema": {
                "type": "string"
              }
            }
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "example": {
                  "name": "Updated Report Type"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Update a report type success",
              "content": {
                "application/json": {
                  "example": {
                    "_id": "1",
                    "name": "Updated Report Type"
                  }
                }
              }
            },
            "500": {
              "description": "Internal Server Error"
            }
          }
        },
        "delete": {
          "summary": "Delete a report type by ID",
          "tags": [
            "Report Type"
          ],
          "parameters": [
            {
              "name": "id",
              "description": "Report Type ID",
              "in": "path",
              "required": true,
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Delete a report type success",
              "content": {
                "application/json": {
                  "example": {
                    "_id": "1",
                    "name": "Report Type 1"
                  }
                }
              }
            },
            "500": {
              "description": "Internal Server Error"
            }
          }
        }
      },
      "/reportTypes/findRpType": {
        "post": {
          "summary": "Find report types by name",
          "tags": [
            "Report Type"
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "example": {
                  "area": "Updated Report Type"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Find report types by name success"
            },
            "500": {
              "description": "Internal Server Error"
            }
          }
        }
      },
      "/logs/": {
        "get": {
          "summary": "Get all logs",
          "responses": {
            "200": {
              "description": "Get all logs success"
            },
            "500": {
              "description": "Internal Server Error"
            }
          }
        }
      },
      "/advertisingLicenseRequest/": {
        "post": {
          "summary": "Create a new advertising license request",
          "tags": [
            "Advertising License Request"
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/AdvertisingLicenseRequest"
                },
                "examples": {
                  "AdvertisingLicenseRequestExample": {
                    "summary": "Example of an Updating Advertising License Request object",
                    "value": {
                      "adBoard": "65a09f6005b37563bf145910",
                      "companyInfo": {
                        "name": "Công ty TNHH ABCD",
                        "contact": {
                          "email": "abcxyz@gmail.com",
                          "phone": "0123456789",
                          "address": "123 nguyễn văn quá, Đông Hưng Thuận, Quận 12, Hồ Chí Minh"
                        }
                      },
                      "user_id": "659a7efb6f98ab3b487afa66",
                      "adContent": "123123123123123",
                      "adImage": [
                        "advertisingLicense/lzdj2dp120jfyz58w1ws"
                      ],
                      "startDate": "2024-01-11T00:00:00.000+00:00",
                      "endDate": "2024-03-13T00:00:00.000+00:00",
                      "status": "Pending"
                    }
                  }
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "OK"
            },
            "500": {
              "description": "Internal Server Error"
            }
          }
        },
        "get": {
          "summary": "Get all advertising license requests",
          "tags": [
            "Advertising License Request"
          ],
          "responses": {
            "200": {
              "description": "Get all advertising license requests success"
            },
            "500": {
              "description": "Internal Server Error"
            }
          }
        }
      },
      "/advertisingLicenseRequest/adboard/{id}": {
        "get": {
          "summary": "Get advertising license requests by adboard ID",
          "tags": [
            "Advertising License Request"
          ],
          "parameters": [
            {
              "name": "id",
              "description": "Adboard ID",
              "in": "path",
              "required": true,
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Get advertising license requests by adboard ID success"
            },
            "500": {
              "description": "Internal Server Error"
            }
          }
        }
      },
      "/advertisingLicenseRequest/{user_id}": {
        "get": {
          "summary": "Get advertising license requests by user ID",
          "tags": [
            "Advertising License Request"
          ],
          "parameters": [
            {
              "name": "user_id",
              "description": "user ID",
              "in": "path",
              "required": true,
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Get advertising license requests success"
            },
            "500": {
              "description": "Internal Server Error"
            }
          }
        }
      },
      "/advertisingLicenseRequest/{id}": {
        "patch": {
          "summary": "Update an advertising license request by ID",
          "tags": [
            "Advertising License Request"
          ],
          "parameters": [
            {
              "name": "id",
              "in": "path",
              "required": true,
              "schema": {
                "type": "string"
              }
            }
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/AdvertisingLicenseRequest"
                },
                "examples": {
                  "AdvertisingLicenseRequestExample": {
                    "summary": "Example of an Updating Advertising License Request object",
                    "value": {
                      "adBoard": "65a09f6005b37563bf145910",
                      "companyInfo": {
                        "name": "Công ty TNHH ABCDE",
                        "contact": {
                          "email": "abcxyz@gmail.com",
                          "phone": "0123456789",
                          "address": "123 nguyễn văn quá, Đông Hưng Thuận, Quận 12, Hồ Chí Minh"
                        }
                      },
                      "user_id": "659a7efb6f98ab3b487afa66",
                      "adContent": "123123123123123",
                      "adImage": [
                        "advertisingLicense/lzdj2dp120jfyz58w1ws"
                      ],
                      "startDate": "2024-01-11T00:00:00.000+00:00",
                      "endDate": "2024-03-13T00:00:00.000+00:00",
                      "status": "Pending"
                    }
                  }
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Update an advertising license request success"
            },
            "500": {
              "description": "Internal Server Error"
            }
          }
        },
        "delete": {
          "summary": "Delete an advertising license request by ID",
          "tags": [
            "Advertising License Request"
          ],
          "parameters": [
            {
              "name": "id",
              "in": "path",
              "required": true,
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Delete an advertising license request success"
            },
            "500": {
              "description": "Internal Server Error"
            }
          }
        }
      },
      "/adBoardEditRequest": {
        "get": {
          "summary": "Get all ad board edit requests",
          "tags": [
            "Ad Board Edit Request"
          ],
          "responses": {
            "200": {
              "description": "Successful response"
            }
          }
        },
        "post": {
          "summary": "Create a new ad board edit request",
          "tags": [
            "Ad Board Edit Request"
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/AdBoardEditRequest"
                },
                "examples": {
                  "adBoardEditRequestExample": {
                    "summary": "Example of ad board request object",
                    "value": {
                      "userRequest": "lequan2002ql@gmail.com",
                      "adBoardId": "6582a64745b7528c3f429b7b",
                      "boardType": "Trụ hộp đèn",
                      "width": 12,
                      "height": 10,
                      "reason": "test",
                      "status": "Pending"
                    }
                  }
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": "Ad board edit request created successfully"
            }
          }
        }
      },
      "/adBoardEditRequest/findByUserRequest": {
        "post": {
          "summary": "Find ad board edit requests by user",
          "tags": [
            "Ad Board Edit Request"
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "userRequest": {
                      "type": "string",
                      "example": "lequan2002ql@gmail.com"
                    }
                  }
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Successful response"
            }
          }
        }
      },
      "/adBoardEditRequest/{id}": {
        "get": {
          "summary": "Get ad board edit request by ID",
          "tags": [
            "Ad Board Edit Request"
          ],
          "parameters": [
            {
              "name": "id",
              "in": "path",
              "required": true,
              "description": "ID of the ad board edit request",
              "schema": {
                "type": "string",
                "example": "65a1550c5e557b6220b3984a"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Successful response",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/AdBoardEditRequest"
                  }
                }
              }
            }
          }
        },
        "put": {
          "summary": "Update ad board edit request by ID",
          "tags": [
            "Ad Board Edit Request"
          ],
          "parameters": [
            {
              "name": "id",
              "in": "path",
              "required": true,
              "description": "ID of the ad board edit request",
              "schema": {
                "type": "string",
                "example": "65a1550c5e557b6220b3984a"
              }
            }
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/AdBoardEditRequest"
                },
                "examples": {
                  "adBoardEditRequestExample": {
                    "summary": "Example of ad board request object",
                    "value": {
                      "userRequest": "lequan2002ql@gmail.com",
                      "adBoardId": "6582a64745b7528c3f429b7b",
                      "boardType": "Trụ hộp đèn",
                      "width": 12,
                      "height": 10,
                      "reason": "test",
                      "status": "Approved"
                    }
                  }
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Ad board edit request updated successfully",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/AdBoardEditRequest"
                  }
                }
              }
            }
          }
        }
      },
      "/adLocationEditRequest": {
        "get": {
          "summary": "Get all ad location edit requests",
          "responses": {
            "200": {
              "description": "Successful response",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/AdLocationEditRequest"
                  }
                }
              }
            }
          }
        },
        "post": {
          "summary": "Create a new ad location edit request",
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/AdLocationEditRequest"
                },
                "examples": {
                  "adBoardEditRequestExample": {
                    "summary": "Example of ad board request object",
                    "value": {
                      "userRequest": "lequan2002ql@gmail.com",
                      "locationId": "6586a94b7a773d9510e75944",
                      "locationType": "Nhà chờ xe buýt",
                      "advertisingType": "Xã hội hoá",
                      "image": "official/ew5pqvdhqh6yqjtkckno",
                      "planned": false,
                      "numberAdBoard": 3,
                      "reason": "asdasd",
                      "status": "Pending"
                    }
                  }
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": "Ad location edit request created successfully"
            }
          }
        }
      },
      "/adLocationEditRequest/findByUserRequest": {
        "post": {
          "summary": "Find ad location edit requests by user",
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "userRequest": {
                      "type": "string",
                      "example": "lequan2002ql@gmail.com"
                    }
                  }
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Find ad location edit requests by user Success"
            }
          }
        }
      },
      "/adLocationEditRequest/{id}": {
        "get": {
          "summary": "Get ad location edit request by ID",
          "parameters": [
            {
              "name": "id",
              "in": "path",
              "required": true,
              "description": "ID of the ad location edit request",
              "schema": {
                "type": "string",
                "example": "65a15bc95e557b6220b3985c"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Successful response",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/AdLocationEditRequest"
                  }
                }
              }
            }
          }
        },
        "put": {
          "summary": "Update ad location edit request by ID",
          "parameters": [
            {
              "name": "id",
              "in": "path",
              "required": true,
              "description": "ID of the ad location edit request",
              "schema": {
                "type": "string",
                "example": "65a15bc95e557b6220b3985c"
              }
            }
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/AdLocationEditRequest"
                },
                "examples": {
                  "adBoardEditRequestExample": {
                    "summary": "Example of ad board request object",
                    "value": {
                      "locationType": "Nhà chờ xe buýt",
                      "advertisingType": "Xã hội hoá",
                      "image": "official/ew5pqvdhqh6yqjtkckno",
                      "planned": false,
                      "numberAdBoard": 3,
                      "reason": "asdasd",
                      "status": "Rejected"
                    }
                  }
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Ad location edit request updated successfully"
            }
          }
        }
      }
    },
    "components": {
      "securitySchemes": {
        "bearerAuth": {
          "type": "http",
          "scheme": "bearer",
          "bearerFormat": "JWT"
        }
      },
      "schemas": {
        "User": {
          "type": "object",
          "properties": {
            "username": {
              "type": "string",
              "description": "Your username"
            },
            "email": {
              "type": "string",
              "description": "Your email",
              "format": "email"
            },
            "password": {
              "type": "string",
              "description": "Your password"
            },
            "newPassword": {
              "type": "string"
            },
            "role": {
              "type": "string"
            },
            "district": {
              "type": "string"
            },
            "ward": {
              "type": "string"
            },
            "rfToken": {
              "type": "string"
            }
          },
          "required": [
            "username",
            "email",
            "password",
            "role"
          ]
        },
        "AdBoard": {
          "type": "object",
          "properties": {
            "location_id": {
              "type": "string",
              "format": "uuid",
              "description": "ID of the associated AdLocation"
            },
            "boardType": {
              "type": "string",
              "description": "Type of the ad board"
            },
            "width": {
              "type": "number",
              "description": "Width of the ad board"
            },
            "height": {
              "type": "number",
              "description": "Height of the ad board"
            },
            "images": {
              "type": "array",
              "items": {
                "type": "string"
              },
              "description": "Array of image URLs associated with the ad board"
            },
            "expiryDate": {
              "type": "string",
              "format": "date",
              "description": "Expiry date of the ad board"
            },
            "advertisingLicense_id": {
              "type": "string",
              "format": "uuid",
              "description": "ID of the associated AdvertisingLicenseRequest"
            }
          },
          "required": [
            "location_id",
            "boardType",
            "width",
            "height"
          ]
        },
        "AdLocation": {
          "type": "object",
          "properties": {
            "address": {
              "type": "string",
              "description": "Address of the advertising location"
            },
            "area": {
              "type": "string",
              "description": "Area of the advertising location"
            },
            "locationType": {
              "type": "string",
              "description": "Type of the advertising location"
            },
            "advertisingType": {
              "type": "string",
              "description": "Type of advertising allowed at the location"
            },
            "image": {
              "type": "string",
              "description": "Image URL of the advertising location"
            },
            "planned": {
              "type": "boolean",
              "description": "Indicates if the advertising location is planned"
            },
            "coordinates": {
              "type": "object",
              "properties": {
                "type": {
                  "type": "string",
                  "default": "Point",
                  "description": "Type of coordinates (e.g., 'Point')"
                },
                "coordinates": {
                  "type": "array",
                  "items": {
                    "type": "number"
                  },
                  "description": "Longitude and latitude coordinates"
                }
              }
            },
            "numberAdBoard": {
              "type": "number",
              "default": 0,
              "description": "Number of ad boards at the location"
            }
          },
          "required": [
            "address",
            "area",
            "locationType",
            "advertisingType",
            "image",
            "planned",
            "coordinates"
          ]
        },
        "AdvertisingLicenseRequest": {
          "type": "object",
          "properties": {
            "adBoard": {
              "type": "string",
              "format": "uuid",
              "description": "The ID of the associated ad board"
            },
            "companyInfo": {
              "type": "object",
              "properties": {
                "name": {
                  "type": "string",
                  "description": "Name of the company"
                },
                "contact": {
                  "type": "object",
                  "properties": {
                    "email": {
                      "type": "string",
                      "format": "email",
                      "description": "Email address for contact"
                    },
                    "phone": {
                      "type": "string",
                      "description": "Phone number for contact"
                    },
                    "address": {
                      "type": "string",
                      "description": "Address for contact"
                    }
                  }
                }
              },
              "description": "Information about the company associated with the license"
            },
            "user_id": {
              "type": "string",
              "format": "uuid",
              "description": "The ID of the associated user"
            },
            "adContent": {
              "type": "string",
              "description": "Content of the advertisement"
            },
            "adImage": {
              "type": "array",
              "items": {
                "type": "string"
              },
              "description": "URLs of the advertisement images"
            },
            "startDate": {
              "type": "string",
              "format": "date-time",
              "description": "Start date of the advertising license"
            },
            "endDate": {
              "type": "string",
              "format": "date-time",
              "description": "End date of the advertising license"
            },
            "status": {
              "type": "string",
              "description": "Status of the advertising license",
              "enum": [
                "Pending",
                "Approved",
                "Rejected"
              ]
            }
          },
          "required": [
            "adBoard",
            "companyInfo",
            "user_id",
            "adContent",
            "adImage",
            "startDate",
            "endDate",
            "status"
          ]
        },
        "advertisingType": {
          "type": "object",
          "properties": {
            "name": {
              "type": "string"
            }
          }
        },
        "district": {
          "type": "object",
          "properties": {
            "name": {
              "type": "string"
            }
          }
        },
        "ward": {
          "type": "object",
          "properties": {
            "district": {
              "type": "string"
            },
            "name": {
              "type": "string"
            }
          }
        },
        "AdBoardEditRequest": {
          "type": "object",
          "properties": {
            "userRequest": {
              "type": "string",
              "description": "User requesting the edit"
            },
            "adBoardId": {
              "type": "string",
              "description": "ID of the ad board being edited"
            },
            "boardType": {
              "type": "string",
              "description": "Type of the ad board"
            },
            "width": {
              "type": "number",
              "description": "Width of the ad board"
            },
            "height": {
              "type": "number",
              "description": "Height of the ad board"
            },
            "reason": {
              "type": "string",
              "description": "Reason for the edit request"
            },
            "status": {
              "type": "string",
              "description": "Status of the edit request"
            }
          },
          "required": [
            "userRequest",
            "adBoardId",
            "boardType",
            "width",
            "height",
            "reason",
            "status"
          ]
        },
        "AdLocationEditRequest": {
          "type": "object",
          "properties": {
            "userRequest": {
              "type": "string",
              "description": "User requesting the edit"
            },
            "locationId": {
              "type": "string",
              "description": "ID of the location being edited"
            },
            "locationType": {
              "type": "string",
              "description": "Type of the location"
            },
            "advertisingType": {
              "type": "string",
              "description": "Type of advertising at the location"
            },
            "image": {
              "type": "string",
              "description": "Image associated with the location"
            },
            "planned": {
              "type": "boolean",
              "description": "Whether the location is planned or not"
            },
            "numberAdBoard": {
              "type": "number",
              "description": "Number of ad boards at the location"
            },
            "reason": {
              "type": "string",
              "description": "Reason for the edit request"
            },
            "status": {
              "type": "string",
              "description": "Status of the edit request"
            }
          },
          "required": [
            "userRequest",
            "locationId",
            "locationType",
            "advertisingType",
            "image",
            "planned",
            "numberAdBoard",
            "reason",
            "status"
          ]
        },
        "reportType": {
          "type": "object",
          "properties": {
            "name": {
              "type": "string"
            }
          }
        },
        "userReport": {
          "type": "object",
          "properties": {
            "time": {
              "type": "string"
            },
            "type": {
              "type": "string",
              "enum": [
                "adboard",
                "plannedLocation"
              ]
            },
            "reportType": {
              "type": "string"
            },
            "senderName": {
              "type": "string"
            },
            "email": {
              "type": "string"
            },
            "phone": {
              "type": "string"
            },
            "reportContent": {
              "type": "string"
            },
            "images": {
              "type": "array",
              "items": {
                "type": "string"
              }
            },
            "status": {
              "type": "string",
              "enum": [
                "Pending",
                "Processed"
              ]
            },
            "area": {
              "type": "string"
            },
            "reference_id": {
              "type": "string"
            },
            "processMethod": {
              "type": "string"
            },
            "updatedTime": {
              "type": "string"
            },
            "longitude": {
              "type": "number"
            },
            "latitude": {
              "type": "number"
            }
          },
          "required": [
            "time",
            "type",
            "reportType",
            "status",
            "senderName",
            "email",
            "phone",
            "reportContent",
            "images",
            "area"
          ]
        }
      }
    },
    "security": [
      {
        "bearerAuth": []
      }
    ]
  },
  "apis": []

}

