# This project is a toy project for training and quality assurance purposes

# Task

All this task must be done in 1 day

- in src/utils/MkdSDK.jsx implement Line 17
- in src/utils/MkdSDK.jsx implement Line 91
- in src/pages/AdminLoginPage.jsx implement Line 30
- once login successful, call snackbar component to show logged in toast. DONT use 3rd party library
- in src/context/Auth/AuthContext.jsx implement 16
- in src/context/Auth/AuthContext.jsx implement 40 to check if token still valid
- There's a bug that it flickers Page Not Found
- once logged in go to dashboard page like figma file
  https://www.figma.com/file/veiESwD61KJBa7BpEHtbdl/react-task-2?node-id=1086%3A15525

- Call paginate api as shown below to get video data. Show 10 per page. Have a next button at bottom when clicked, load next 10 videos

- Call paginate api as shown below to get video data. Show 10 per page. Have a prev button at bottom when clicked, load prev 10 videos

- Implement logout button

- Please READ SDK file and reuse code when you can. DO NOT REINVENT THE WHEEL.
- Use React Drag and drop library https://react-dnd.github.io/react-dnd/about to be able to rearrange the rows and columns in the table in dashboard. On Refresh, the columns go back to default

- in src/pages/AdminListReceipts.jsx - there is a table listing receipts

  - fix the list table, the localReceiptData need data from src/utils/data.jsx, for some reason it is not getting that data

  - fix the bind issue in src/components/MkdListTable/MkdListTableBindOperations.jsx - all //TO DO
    the `MkdListTableV2` component has actions props which is an object of key:value pair of action definitions
    For example the edit action,
    find other actions with the `bind` property
    <pre>
    edit: {
    show: true,
    action: (ids)=> {},
    multiple: false,
    locations: ["buttons", "dropdown"],
    icon: <EditIcon2 />,
    bind: {
    column: "receipt_status",
    action: "hide",
    operator: operations.EQUAL,
    ifValue: 1,
    },
    }
    </pre>
  - complete the open and close action feature, update the status to open and close to see the above binding work, also not that close action is meant to show open if status is open, and open is only meant to show is status is closed - `lines -> 326,330,444,464`

    > the edit action binds via the bind property to a column "receipt_status", if the value of receipt_status is 1 then the edit should be hidden, i.e not shown

  - in src/components/MkdListTable/MkdListTableRow.jsx each column has a format it should be rendered in

    - "line_items" and "receipt_charges" have the list property `true`, listType: `json|object_array` could be `json|number_array` or `json|string_array` but in this case it is the `json|object_array`

    - write the algorithm in src/utils/utils.jsx - Line 179 using the column format and action in format, which tells you what key in the array of objects you need to work on.

      > operation is either to `list` all the values and return an array or `add` to add all the values of the key and return the result

      <pre> Sample Column Format = {
      header: "receipt_charges",
        accessor: "receipt_charges",
        isSorted: true,
        list: true,
        limit: 6,
        listType: "json|object_array",
        action: {
          key: "total_charges",
          operation: "add",
        },
        selected_column: true,
        isSortedDesc: false,
        mappingExist: false,
        mappings: {},
      },
      </pre>

## Login

```
https://reacttask.mkdlabs.com/v2/api/lambda/login
Method POST
content-type application/json
x-project cmVhY3R0YXNrOmQ5aGVkeWN5djZwN3p3OHhpMzR0OWJtdHNqc2lneTV0Nw==
body
{
  "email": "adminreacttask@manaknight.com",
  "password": "a123456",
  "role": "admin"
}
Response
{
    "error": false,
    "role": "admin",
    "token": "",
    "expire_at": 3600,
    "user_id": 1
}
```

## Check

```
Check if token still valid
https://reacttask.mkdlabs.com/v2/api/lambda/check
Method POST
Header
x-project cmVhY3R0YXNrOmQ5aGVkeWN5djZwN3p3OHhpMzR0OWJtdHNqc2lneTV0Nw==
Bearer <token>
body
{
  "role": "admin"
}
Response
http code 200
```

## Video Paginate

```
https://reacttask.mkdlabs.com/v1/api/rest/video/PAGINATE
Method POST
Header
x-project cmVhY3R0YXNrOmQ5aGVkeWN5djZwN3p3OHhpMzR0OWJtdHNqc2lneTV0Nw==
Bearer <token>
body
{
    "payload": {},
    "page": 1,
    "limit": 10
}
Response
http code 200
{
    "error": false,
    "list": [
        {
            "id": 1,
            "title": "Rune raises $100,000 for marketing through NFT butterflies sale",
            "photo": "https://picsum.photos/200/200",
            "user_id": 1,
            "username": "boss",
            "create_at": "2022-01-01",
            "update_at": "2022-01-01T04:00:00.000Z",
            "like": 10
        }
    ],
    "page": 1,
    "limit": 10,
    "total": 112,
    "num_pages": 12
}

```
