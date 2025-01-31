// Permissions
const tablePermissions = document.querySelector("[table-permissions]");
if (tablePermissions) {
  const buttonSubmit = document.querySelector("[button-submit-permissions]");
  buttonSubmit.addEventListener("click", () => {
    let result = [];

    const rows = tablePermissions.querySelectorAll("[data-name]");

    rows.forEach((row) => {
      const name = row.getAttribute("data-name");
      const inputs = row.querySelectorAll("input");

      if (name == "id") {
        inputs.forEach((input) => {
          const value = input.value;
          result.push({
            id: value,
            permissions: [],
          });
        });
      } else {
        inputs.forEach((input, index) => {
          const checked = input.checked;
          if (checked) {
            result[index].permissions.push(name);
          }
        });
      }
    });

    const formChangePermissions = document.querySelector(
      "[form-change-permissions]"
    );
    const inputPermissions = formChangePermissions.querySelector("input");
    inputPermissions.value = JSON.stringify(result);
    formChangePermissions.submit();
  });
}

// End Permissions

// Data default Table Permissions
const dataRecords = document.querySelector("[data-records]");
if(dataRecords) {
  const records = JSON.parse(dataRecords.getAttribute("data-records"));
  const tablePermissions = document.querySelector("[table-permissions]");

  records.forEach((record, index) => {
    const permissions = record.permissions;

    permissions.forEach(permissions => {
      const row = tablePermissions.querySelector(`tr[data-name="${permissions}"]`);
      const input = row.querySelectorAll("input")[index];
      input.checked = true;
    })
  });
}
// End Data default Table Permissions