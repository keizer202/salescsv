# Sales CSV

Sales CSV is a NestJS program that allows user to upload a csv file in an endpoint and preview it using another enpoint.

## Installation

Use Terminal or Command Prompt to install all required pakages to run the program

```bash
$ npm install
```
## Running the app

```bash
# development
$ npm run start
```

## Run the endpoint

Use Postman to execute the endpoint. 

### Upload CSV
In Postman, set method to <b>Post</b> to upload the CSV file. In Body tab, set it to form-data then in Key column add <b>file</b> key then change it from Text to File. After changing it, you will see a <b>Select Files</b> button. Use that button to upload the CSV file. Kindly use below url to execute this endpoint.

```bash
http://localhost:3000/sales/record
```

Sample output after executing the endpoint
```bash
{
  "message": "Record Successfully Uploaded"
}
```

#### Note:
You may also use the sample csv file located in csv folder to test the Upload CSV endpoint.

### Preview Uploaded Record
In Postman, set method to <b>Get</b> to view the uploaded record. Kindly use below url to execute this endpoint.

```bash
http://localhost:3000/sales/report
```

Sample output after executing the  endpoint
```bash
[
  {
    "userName": "user1",
    "age": "29",
    "height": "160",
    "gender": "male",
    "sales": "2000",
    "lastPurchaseDate": "2022-03-10"
  },
  {
    "userName": "User2",
    "age": "23",
    "height": "150",
    "gender": "Female",
    "sales": "5000",
    "lastPurchaseDate": "2022-03-09"
  }
]
```

### Preview Uploaded Record with Date Range
Same process with <b>Preview Uploaded Record</b>, you just need to add query data in json format. In Body tab, set to <b>raw</b> then change the data format to json. Use the format of below json sample statement.

```bash
{
  "date_from": "2022-03-10",
  "date_to": "2022-03-10"
}
```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)
