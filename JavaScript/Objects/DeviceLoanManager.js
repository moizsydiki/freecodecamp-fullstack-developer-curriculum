const equipmentLedger = {
  1: {
    type: "PC",
    status: "CheckedOut",
    borrower: { name: "John Smith", email: "john@acme.org" },
    dueDate: "11/30/2025",
  },
  2: {
    type: "Laptop",
    status: "CheckedIn",
    borrower: { name: "", email: "" },
    dueDate: "",
  },
  3: {
    type: "Laptop",
    status: "CheckedOut",
    borrower: { name: "Jane Doe", email: "jane@acme.org" },
    dueDate: "10/31/2025",
  },
  4: {
    type: "iPad",
    status: "CheckedIn",
    borrower: { name: "", email: "" },
    dueDate: "",
  },
};

const checkoutDevice = (ledger, assetTag, borrower) => {
  if (!ledger[assetTag]) {
    return {
      ledger,
      message: `${assetTag} was not found.`,
    };
  }

  if (ledger[assetTag].status === "CheckedOut") {
    return {
      ledger,
      message: `${assetTag} is already checked out.`,
    };
  }

  const updatedledger = {
    ...ledger,
    [assetTag]: {
      ...ledger[assetTag],
      status: "CheckedOut",
      borrower: {
        name: borrower.name,
        email: borrower.email,
      },
    },
  };

  return {
    ledger: updatedledger,
    message: `${assetTag} has been checked out to${borrower.name}`,
  };
};

const checkinDevice = (ledger, assetTag) => {
  if (!ledger[assetTag]) {
    return {
      ledger,
      message: `${assetTag} was not found.`,
    };
  }

  const updatedledger = {
    ...ledger,
    [assetTag]: {
      ...ledger[assetTag],
      status: "CheckedIn",
      borrower: {
        name: "",
        email: "",
      },
      dueDate: "",
    },
  };

  return {
    ledger: updatedledger,
    message: `${assetTag} has been checked in.`,
  };
};

const listOverdueDevices = (ledger, today) => {
  const getDateValue = (date) => {
    const [month, day, year] = date.split("/");

    return `${year}${month.padStart(2, "0")}${day.padStart(2, "0")}`;
  };

  const todayValue = getDateValue(today);

  return Object.values(ledger)
    .filter((device) => {
      return (
        device.status === "CheckedOut" &&
        getDateValue(device.dueDate) < todayValue
      );
    })
    .sort((a, b) => {
      return getDateValue(a.dueDate).localeCompare(getDateValue(b.dueDate));
    });
};

const serializeLedger = (ledger) => {
  return JSON.stringify(ledger);
};

const loadLedger = (json) => {
  return JSON.parse(json);
};
