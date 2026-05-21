import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
interface LoanApplication {
  id: number;
  customer: string;
  mobile: string;
  occupation: string;
  loanType: string;
  bank: string;
  loanAmount: string;
  leadSource: string;
  city: string;
  loginDate: string;
  fileLoginDate: string;
  status: string;
  disbursalDate: string;
  executive: string;
  remarks: string;
  statusDate: string;
}

export default function LoanMISDashboard() {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const statuses = [
    "Sent To Bank",
    "Login FI Awaited",
    "WIP",
    "Legal Awaited",
    "Technical Awaited",
    "Under Credit Processing",
    "Soft Sanction",
    "Sent To OPS",
    "Sanction",
    "Disbursed",
    "Rejected",
  ];

  const [search, setSearch] = useState("");
  const [bankFilter, setBankFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [editId, setEditId] = useState<number | null>(null);
const [toast, setToast] = useState({
  show: false,
  message: "",
  type: "success",
});
  const [form, setForm] = useState<LoanApplication>({
    id: Date.now(),
    customer: "",
    mobile: "",
    occupation: "",
    loanType: "",
    bank: "",
    loanAmount: "",
    leadSource: "",
    city: "",
    loginDate: "",
    fileLoginDate: "",
    status: "",
    disbursalDate: "",
    executive: "",
    remarks: "",
    statusDate: "",
  });

  const [applications, setApplications] = useState<LoanApplication[]>([
    
  ]);
useEffect(() => {
  const savedData =
    localStorage.getItem("loan-mis");

  if (savedData) {
    setApplications(
      JSON.parse(savedData)
    );
  }
}, []);

useEffect(() => {
  localStorage.setItem(
    "loan-mis",
    JSON.stringify(applications)
  );
}, [applications]);
const statusColor = (status: string) => {
  switch (status) {
    case "Sent To Bank":
      return "bg-blue-100 text-blue-700";

    case "Login FI Awaited":
      return "bg-orange-100 text-orange-700";

    case "WIP":
      return "bg-yellow-100 text-yellow-700";

    case "Legal Awaited":
      return "bg-pink-100 text-pink-700";

    case "Technical Awaited":
      return "bg-cyan-100 text-cyan-700";

    case "Under Credit Processing":
      return "bg-indigo-100 text-indigo-700";

    case "Soft Sanction":
      return "bg-purple-100 text-purple-700";

    case "Sent To OPS":
      return "bg-slate-200 text-slate-700";

    case "Sanction":
      return "bg-emerald-100 text-emerald-700";

    case "Disbursed":
      return "bg-green-100 text-green-700";

    case "Rejected":
      return "bg-red-100 text-red-700";

    default:
      return "bg-gray-100 text-gray-700";
  }
};

  const filteredApplications = useMemo(() => {
    return applications.filter((app) => {
   const searchMatch =
  app.customer.toLowerCase().includes(search.toLowerCase()) ||
  app.mobile.includes(search) ||
app.bank.toLowerCase().includes(search.toLowerCase()) ||
app.executive.toLowerCase().includes(search.toLowerCase()) ||
app.city.toLowerCase().includes(search.toLowerCase());

      const bankMatch =
        bankFilter === "All" || app.bank === bankFilter;

      const statusMatch =
        statusFilter === "All" || app.status === statusFilter;

      return searchMatch && bankMatch && statusMatch;
    });
  }, [applications, search, bankFilter, statusFilter]);

  const resetForm = () => {
    setForm({
      id: Date.now(),
      customer: "",
      mobile: "",
      occupation: "",
      loanType: "",
      bank: "",
      loanAmount: "",
      leadSource: "",
      city: "",
      loginDate: "",
      fileLoginDate: "",
      status: "",
      disbursalDate: "",
      executive: "",
      remarks: "",
      statusDate: "",
    });

    setEditId(null);
  };

const addCase = () => {
  if (
    !form.customer ||
    !form.mobile ||
    !form.bank ||
    !form.status
  ) {
    alert("Please fill required fields");
    return;
  }

  if (form.mobile.length !== 10) {
    alert("Mobile number must be 10 digits");
    return;
  }

  if (editId) {
    setApplications((prev) =>
      prev.map((item) =>
        item.id === editId ? form : item
      )
    );
  } else {
    setApplications((prev) => [
      ...prev,
     {
  ...form,
  id: Date.now(),
  statusDate:
    form.statusDate ||
    new Date()
      .toISOString()
      .split("T")[0],
},
    ]);
  }

  resetForm();
};

const editCase = (app: LoanApplication) => {
    setForm(app);
    setEditId(app.id);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

const deleteCase = (id: number) => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this case?"
  );

  if (!confirmDelete) return;

  setApplications((prev) =>
    prev.filter((item) => item.id !== id)
  );
};

const updateStatus = (id: number, value: string) => {
  const today = new Date()
    .toISOString()
    .split("T")[0];

  setApplications((prev) =>
    prev.map((item) =>
      item.id === id
        ? {
            ...item,
            status: value,
            statusDate: today,
           disbursalDate:
  value === "Disbursed"
    ? today
    : value === "Rejected"
    ? ""
    : item.disbursalDate,
          }
        : item
    )
  );
};

  const exportExcel = () => {
const worksheet = XLSX.utils.json_to_sheet(
  filteredApplications.map((item) => ({
    "Customer Name": item.customer,
    "Mobile Number": item.mobile,
    Occupation: item.occupation,
    "Loan Type": item.loanType,
    "Loan Amount": item.loanAmount,
    City: item.city,
    "Bank Name": item.bank,
    "Lead Source": item.leadSource,
    "Login Date": item.loginDate,
    "Status Date": item.statusDate,
    "Lead Date": item.fileLoginDate,
    "Disbursal Date": item.disbursalDate,
    "Executive Name": item.executive,
    Status: item.status,
    Remarks: item.remarks,
  }))
);

    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(
      workbook,
      worksheet,
      "Loan MIS"
    );

    XLSX.writeFile(workbook, "loan_mis.xlsx");
  };
  const exportPDF = () => {
const doc = new jsPDF({
  orientation: "landscape",
  unit: "mm",
  format: "a4",
});

  // Header
doc.setFillColor(15, 118, 110);
doc.rect(0, 0, 297, 32, "F");

// Company Name
doc.setTextColor(255, 255, 255);
doc.setFontSize(26);
doc.setFont("helvetica", "bold");

doc.text("RupeeDial", 14, 16);

// Subtitle
doc.setFontSize(11);
doc.setFont("helvetica", "normal");

doc.text(
  "Loan MIS CRM Dashboard Report",
  14,
  24
);

  // Report Date
  doc.setTextColor(100);
  doc.setFontSize(10);

 doc.setFillColor(248, 250, 252);

doc.roundedRect(
  10,
  38,
  277,
  16,
  2,
  2,
  "F"
);

doc.setFontSize(10);
doc.setTextColor(60);

doc.text(
  `Generated On: ${new Date().toLocaleDateString()}`,
  16,
  48
);

doc.setFont("helvetica", "bold");

doc.text(
  `Total Cases: ${applications.length}`,
  90,
  48
);

doc.text(
  `Disbursed: ${
    applications.filter(
      (i) => i.status === "Disbursed"
    ).length
  }`,
  160,
  48
);

doc.text(
  `Rejected: ${
    applications.filter(
      (i) => i.status === "Rejected"
    ).length
  }`,
  230,
  48
);
  // Table

autoTable(doc, {
  startY: 60,

  head: [[
    "Customer",
    "Mobile",
    "Occupation",
    "Loan",
    "Amount",
    "Bank",
    "City",
    "Status",
    "Executive",
    "Login Date",
    "Disbursal",
  ]],

  body: filteredApplications.map(
    (item) => [
      item.customer,
      item.mobile,
      item.occupation,
      item.loanType,
      `₹ ${Number(
        item.loanAmount
      ).toLocaleString("en-IN")}`,
      item.bank,
      item.city,
      item.status,
      item.executive,
      item.loginDate,
      item.disbursalDate || "-",
    ]
  ),

  theme: "grid",

 styles: {
  fontSize: 7.5,
  cellPadding: 2.5,
  valign: "middle",
  overflow: "linebreak",
  lineColor: [226, 232, 240],
  lineWidth: 0.2,
},
columnStyles: {
  0: { cellWidth: 30 },
  1: { cellWidth: 28 },
  2: { cellWidth: 24 },
  3: { cellWidth: 18 },
  4: { cellWidth: 26 },
  5: { cellWidth: 24 },
  6: { cellWidth: 22 },
  7: { cellWidth: 30 },
  8: { cellWidth: 30 },
  9: { cellWidth: 26 },
  10: { cellWidth: 26 },
},
  headStyles: {
    fillColor: [29, 78, 216],
    textColor: 255,
    fontStyle: "bold",
    halign: "center",
  },

  bodyStyles: {
    textColor: 50,
  },

  alternateRowStyles: {
    fillColor: [245, 247, 250],
  },

  margin: {
    left: 8,
    right: 8,
  },

  tableWidth: "auto",
});
  // Footer
  const pageCount =
    (doc as any).internal.getNumberOfPages();

  for (
    let i = 1;
    i <= pageCount;
    i++
  ) {
    doc.setPage(i);

    doc.setFontSize(9);

    doc.setTextColor(120);
doc.text(
  `Powered By RupeeDial CRM | Page ${i} of ${pageCount}`,
  118,
  190
);
  }

doc.save(
  `RupeeDial_MIS_Report_${new Date()
    .toISOString()
    .split("T")[0]}.pdf`
);
};
const formatExcelDate = (
  value: any
) => {
  if (!value) return "";

  if (
    typeof value === "number"
  ) {
    const date =
      XLSX.SSF.parse_date_code(
        value
      );

    return `${date.y}-${String(
      date.m
    ).padStart(2, "0")}-${String(
      date.d
    ).padStart(2, "0")}`;
  }

return String(value)
  .split("T")[0];
};
  const handleUpload = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

  if (!file) {
  setToast({
    show: true,
    message: "Please select an Excel file",
    type: "error",
  });

  return;
}

    const reader = new FileReader();

    reader.onload = (e) => {
      const data = e.target?.result;

      const workbook = XLSX.read(data, {
        type: "binary",
      });

      const sheetName = workbook.SheetNames[0];

      const worksheet =
        workbook.Sheets[sheetName];

      const jsonData =
        XLSX.utils.sheet_to_json<any>(worksheet);

   const uploaded = jsonData
  .filter(
  (item: any) =>
    String(
      item["Customer Name"] || ""
    ).trim() &&
    String(
      item["Mobile Number"] || ""
    ).trim()
)
  .map(
        (item: any, index: number) => ({
          id: Date.now() + index,
         customer:
  item["Customer Name"] ||
  item["Customer"] ||
  "",

mobile: String(
  item["Mobile Number"] ||
  item["Mobile"] ||
  ""
).replace(/\D/g, ""),

occupation:
  item["Occupation"] ||
  item["Occupation Type"] ||
  "",

loanType:
  item["Loan Type"] || "",

bank:
  item["Bank Name"] ||
  item["Bank"] ||
  "",

loginDate:
  formatExcelDate(
    item["Login Date"]
  ),

loanAmount: String(
  item["Loan Amount"] || ""
).replace(/\D/g, ""),

leadSource:
  item["Lead Source"] || "",

city:
  item["City"] || "",

fileLoginDate:
  formatExcelDate(
    item["Lead Date"] ||
    item["File Login Date"]
  ),
       status:
  statuses.includes(
    item["Status"]
  )
    ? item["Status"]
    : "WIP",
         disbursalDate:
  formatExcelDate(
    item["Disbursal Date"]
  ),
         executive:
  String(
    item["Executive Name"] || ""
  ).trim(),
         remarks: String(
  item["Remarks"] || ""
).trim(),
         statusDate:
  formatExcelDate(
    item["Status Date"]
  ) ||
  new Date()
    .toISOString()
    .split("T")[0],
        })
      );

setApplications((prev) => {

  const uniqueUploaded =
    uploaded.filter(
      (u: LoanApplication) =>
        !prev.some(
          (p) =>
            p.mobile.trim() ===
              u.mobile.trim() &&
            p.bank
              .toLowerCase()
              .trim() ===
              u.bank
                .toLowerCase()
                .trim() &&
            p.customer
              .toLowerCase()
              .trim() ===
              u.customer
                .toLowerCase()
                .trim()
        )
    );

if (uniqueUploaded.length === 0) {
  setToast({
    show: true,
    message: "No new records found in Excel",
    type: "error",
  });

  return prev;
}
setToast({
  show: true,
  message: `${uniqueUploaded.length} new cases uploaded successfully`,
  type: "success",
});

setTimeout(() => {
  setToast({
    show: false,
    message: "",
    type: "success",
  });
}, 3000);

  return [...prev, ...uniqueUploaded];
});


    };

    reader.readAsBinaryString(file);
    event.target.value = "";
  };

  return (
    <div className="min-h-screen bg-slate-100 p-4 md:p-8">
      {/* Toast */}
{toast.show && (
  <div
    className={`fixed top-4 right-5 z-50 px-5 py-2 rounded-2xl shadow-2xl text-white font-semibold transition-all duration-300 ${
      toast.type === "success"
        ? "bg-green-600"
        : "bg-red-500"
    }`}
  >
    {toast.message}
  </div>
)}
      <div className="max-w-7xl mx-auto space-y-4">

        {/* Header */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 px-5 py-2 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">

  {/* Left */}
  <div>
    <h1 className="text-2xl font-bold text-slate-800 leading-tight">
      Loan MIS CRM Dashboard
    </h1>

    <p className="text-sm text-slate-500 mt-1">
      Login To Disbursal Workflow
    </p>
  </div>

  {/* Right Buttons */}
  <div className="flex flex-wrap gap-2 w-full lg:w-auto">

    {/* Add */}
    <button
      onClick={addCase}
      className={`${
        editId
          ? "bg-amber-500 hover:bg-amber-600"
          : "bg-blue-600 hover:bg-blue-700"
      } h-[42px] min-w-[90px] px-4 rounded-lg text-sm font-semibold text-white shadow-sm transition-all`}
    >
      {editId ? "Update Case" : "+ Add Case"}
    </button>

    {/* Download */}
    <button
      onClick={exportExcel}
      className="bg-green-600 hover:bg-green-700 h-[42px] min-w-[90px] px-4 rounded-lg text-sm font-semibold text-white shadow-sm transition-all"
    >
      Download Excel
    </button>
{/* PDF */}
<button
  onClick={exportPDF}
  className="bg-red-600 hover:bg-red-700 h-[42px] min-w-[90px] px-4 rounded-lg text-sm font-semibold text-white shadow-sm transition-all"
>
  Download PDF
</button>
    {/* Upload */}
    <button
      onClick={() =>
        fileInputRef.current?.click()
      }
      className="bg-indigo-600 hover:bg-indigo-700 h-[42px] min-w-[90px] px-4 rounded-lg text-sm font-semibold text-white shadow-sm transition-all"
    >
      Upload Excel
    </button>

    <input
      ref={fileInputRef}
      type="file"
      className="hidden"
      accept=".xlsx,.xls"
      onChange={handleUpload}
    />

  </div>
</div>

    
    {/* Dashboard Cards */}
<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">

  {/* Total */}
  <div className="bg-white rounded-xl px-4 py-2 shadow-sm border border-slate-200">
    <p className="text-[12px] font-semibold tracking-wide text-slate-500">
      Total Cases
    </p>

    <h2 className="text-xl font-bold text-blue-600 mt-1">
      {applications.length}
    </h2>
  </div>

  {/* Login */}
  <div className="bg-white rounded-xl px-4 py-2 shadow-sm border border-slate-200">
    <p className="text-[12px] font-semibold tracking-wide text-slate-500">
      Login Cases
    </p>

    <h2 className="text-xl font-bold text-indigo-600 mt-1">
      {
        applications.filter(
  (i) =>
    i.status === "Sent To Bank" ||
    i.status === "Login FI Awaited"
).length
      }
    </h2>
  </div>

  {/* Disbursed */}
  <div className="bg-white rounded-xl px-4 py-2 shadow-sm border border-slate-200">
    <p className="text-[12px] font-semibold tracking-wide text-slate-500">
      Disbursed
    </p>

    <h2 className="text-xl font-bold text-green-600 mt-1">
      {
        applications.filter(
          (i) => i.status === "Disbursed"
        ).length
      }
    </h2>
  </div>

  {/* WIP */}
  <div className="bg-white rounded-xl px-4 py-2 shadow-sm border border-slate-200">
    <p className="text-[12px] font-semibold tracking-wide text-slate-500">
      WIP Cases
    </p>

    <h2 className="text-xl font-bold text-yellow-600 mt-1">
      {
        applications.filter(
  (i) =>
    i.status === "WIP" ||
    i.status === "Legal Awaited" ||
    i.status === "Technical Awaited" ||
    i.status === "Under Credit Processing" ||
    i.status === "Soft Sanction" ||
    i.status === "Sent To OPS" ||
    i.status === "Sanction"
).length
      }
    </h2>
  </div>

  {/* Rejected */}
  <div className="bg-white rounded-xl px-4 py-2 shadow-sm border border-slate-200">
    <p className="text-[12px] font-semibold tracking-wide text-slate-500">
      Rejected
    </p>

    <h2 className="text-xl font-bold text-red-600 mt-1">
      {
        applications.filter(
          (i) => i.status === "Rejected"
        ).length
      }
    </h2>
  </div>

</div>
        {/* Add Form */}
        <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-4">
          <h2 className="text-lg font-semibold text-slate-800 mb-3">
            Add / Edit Loan Case
          </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-2">

  {/* Customer */}
  <div>
    <label className="text-[12px] font-semibold tracking-wide text-slate-700 mb-1 block">
      Customer Name
    </label>

    <input
      type="text"
      value={form.customer}
      onChange={(e) =>
        setForm({
          ...form,
          customer: e.target.value,
        })
      }
      className="border border-slate-200 bg-white rounded-lg px-4 h-[42px] w-full outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
    />
  </div>

  {/* Mobile */}
  <div>
    <label className="text-[12px] font-semibold tracking-wide text-slate-700 mb-1 block">
      Mobile Number
    </label>

    <input
     type="tel"
maxLength={10}
value={form.mobile}
     onChange={(e) =>
  setForm({
    ...form,
    mobile: e.target.value.replace(/\D/g, ""),
  })
}
      className="border border-slate-200 bg-white rounded-lg px-4 h-[42px] w-full outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
    />
  </div>

  {/* Occupation */}
  <div>
    <label className="text-[12px] font-semibold tracking-wide text-slate-700 mb-1 block">
      Occupation Type
    </label>

    <select
      value={form.occupation}
      onChange={(e) =>
        setForm({
          ...form,
          occupation: e.target.value,
        })
      }
      className="border border-slate-200 bg-white rounded-lg px-4 h-[42px] w-full outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
    >
      <option value="">
        Select Occupation
      </option>

      <option>Salaried</option>
      <option>Self Employed</option>
      <option>Professional</option>
      <option>Business Owner</option>
      <option>Doctor</option>
      <option>CA</option>
      <option>Advocate</option>
    </select>
  </div>

  {/* Loan Type */}
  <div>
    <label className="text-[12px] font-semibold tracking-wide text-slate-700 mb-1 block">
      Loan Type
    </label>

    <input
      type="text"
      value={form.loanType}
      onChange={(e) =>
        setForm({
          ...form,
          loanType: e.target.value,
        })
      }
      className="border border-slate-200 bg-white rounded-lg px-4 h-[42px] w-full outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
    />
  </div>

  {/* Loan Amount */}
  <div>
    <label className="text-[12px] font-semibold tracking-wide text-slate-700 mb-1 block">
      Loan Amount
    </label>

    <input
      type="text"
      value={form.loanAmount}
      
       onChange={(e) =>
  setForm({
    ...form,
    loanAmount: e.target.value.replace(/\D/g, ""),
  })
}
      className="border border-slate-200 bg-white rounded-lg px-4 h-[42px] w-full outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
    />
  </div>

  {/* City */}
  <div>
    <label className="text-[12px] font-semibold tracking-wide text-slate-700 mb-1 block">
      City
    </label>

    <input
      type="text"
      value={form.city}
      onChange={(e) =>
        setForm({
          ...form,
          city: e.target.value,
        })
      }
      className="border border-slate-200 bg-white rounded-lg px-4 h-[42px] w-full outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
    />
  </div>

  {/* Bank */}
  <div>
    <label className="text-[12px] font-semibold tracking-wide text-slate-700 mb-1 block">
      Bank Name
    </label>

    <input
      type="text"
      value={form.bank}
      onChange={(e) =>
        setForm({
          ...form,
          bank: e.target.value,
        })
      }
      className="border border-slate-200 bg-white rounded-lg px-4 h-[42px] w-full outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
    />
  </div>

  {/* Lead Source */}
  <div>
    <label className="text-[12px] font-semibold tracking-wide text-slate-700 mb-1 block">
      Lead Source
    </label>

    <input
      type="text"
      value={form.leadSource}
      onChange={(e) =>
        setForm({
          ...form,
          leadSource: e.target.value,
        })
      }
      className="border border-slate-200 bg-white rounded-lg px-4 h-[42px] w-full outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
    />
  </div>

  {/* Login Date */}
  <div>
    <label className="text-[12px] font-semibold tracking-wide text-slate-700 mb-1 block">
      Login Date
    </label>

    <input
      type="date"
      value={form.loginDate}
      onChange={(e) =>
        setForm({
          ...form,
          loginDate: e.target.value,
        })
      }
      className="border border-slate-200 bg-white rounded-lg px-4 h-[42px] w-full"
    />
  </div>

  {/* Status Date */}
  <div>
    <label className="text-[12px] font-semibold tracking-wide text-slate-700 mb-1 block">
      Status Date
    </label>

    <input
      type="date"
      value={form.statusDate}
      onChange={(e) =>
        setForm({
          ...form,
          statusDate: e.target.value,
        })
      }
      className="border border-slate-200 bg-white rounded-lg px-4 h-[42px] w-full"
    />
  </div>

  {/* Lead Date */}
  <div>
    <label className="text-[12px] font-semibold tracking-wide text-slate-700 mb-1 block">
      Lead Date
    </label>

    <input
      type="date"
      value={form.fileLoginDate}
      onChange={(e) =>
        setForm({
          ...form,
          fileLoginDate: e.target.value,
        })
      }
      className="border border-slate-200 bg-white rounded-lg px-4 h-[42px] w-full"
    />
  </div>

  {/* Disbursal Date */}
  <div>
    <label className="text-[12px] font-semibold tracking-wide text-slate-700 mb-1 block">
      Disbursal Date
    </label>

    <input
      type="date"
      value={form.disbursalDate}
      onChange={(e) =>
        setForm({
          ...form,
          disbursalDate: e.target.value,
        })
      }
      className="border border-slate-200 bg-white rounded-lg px-4 h-[42px] w-full"
    />
  </div>

  {/* Executive */}
  <div>
    <label className="text-[12px] font-semibold tracking-wide text-slate-700 mb-1 block">
      Executive Name
    </label>

    <input
      type="text"
      value={form.executive}
      onChange={(e) =>
        setForm({
          ...form,
          executive: e.target.value,
        })
      }
      className="border border-slate-200 bg-white rounded-lg px-4 h-[42px] w-full outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
    />
  </div>

  {/* Status */}
  <div>
    <label className="text-[12px] font-semibold tracking-wide text-slate-700 mb-1 block">
      Status
    </label>

    <select
      value={form.status}
      onChange={(e) =>
        setForm({
          ...form,
          status: e.target.value,
        })
      }
      className="border border-slate-200 bg-white rounded-lg px-4 h-[42px] w-full outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
    >
     <option value="WIP">
  WIP
</option>

      {statuses.map((status) => (
        <option key={status}>
          {status}
        </option>
      ))}
    </select>
  </div>

 {/* Remarks */}
<div className="col-span-2 md:col-span-2 xl:col-span-3">
  <label className="text-[12px] font-semibold tracking-wide text-slate-700 mb-1 block">
    Remarks
  </label>

  <textarea
    value={form.remarks}
    onChange={(e) =>
      setForm({
        ...form,
        remarks: e.target.value,
      })
    }
    placeholder="Enter Remarks"
   className="border border-slate-200 bg-white rounded-lg px-3 py-2 text-sm w-full h-[44px] resize-none outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
  />
</div>
{/* Action Buttons */}
<div className="col-span-2 md:col-span-1 xl:col-span-1 flex items-start gap-2 pt-6">

  <button
    onClick={addCase}
    className={`${
      editId
        ? "bg-amber-500 hover:bg-amber-600"
        : "bg-blue-600 hover:bg-blue-700"
    } min-w-[110px] transition-all text-white h-[44px] px-4 rounded-lg text-sm font-semibold shadow-sm`}
  >
    {editId ? "Update Case" : "Add Case"}
  </button>

  <button
    onClick={resetForm}
    className="bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 h-[44px] min-w-[90px] px-4 rounded-lg text-sm font-semibold"
  >
    Reset
  </button>

</div>
</div>



</div>

        {/* Filters */}
        <div className="bg-white rounded-3xl shadow-md border border-slate-200 p-4">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-3">

            <input
              type="text"
              placeholder="Search Customer"
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              className="border border-slate-200 bg-white rounded-lg px-4 py-2 w-full h-[42px] outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
            />

            <select
              value={bankFilter}
              onChange={(e) =>
                setBankFilter(e.target.value)
              }
              className="border border-slate-200 bg-white rounded-lg px-4 py-2 w-full h-[42px] outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
            >
              <option value="All">
                All Banks
              </option>

              {[
  ...new Set(
    applications
      .map((a) => a.bank)
      .filter(Boolean)
  ),
].map((bank) => (
  <option key={bank}>
    {bank}
  </option>
))}
            </select>

            <select
              value={statusFilter}
              onChange={(e) =>
                setStatusFilter(e.target.value)
              }
              className="border border-slate-200 bg-white rounded-lg px-4 py-2 w-full h-[42px] outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
            >
              <option value="All">
                All Status
              </option>

              {statuses.map((status) => (
                <option key={status}>
                  {status}
                </option>
              ))}
            </select>

          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-3xl shadow-sm overflow-hidden">
   <div className="overflow-x-auto max-h-[600px]">

            <table className="w-full min-w-[1500px]">

            <thead className="bg-slate-100 border-b border-slate-200 text-slate-700 text-sm sticky top-0 z-20 backdrop-blur">

                <tr>
                  {[
                    "S.No",
                     "Lead Source",
                    "Lead Date",
                    
                    "Customer",
                    "Mobile",
                    "Occupation",
                    "Loan Type",
                     "Loan Amount",
                   
                    "City",
                    "Bank",
                     "Executive",
                      "Login Date",
                   
                    
                    "Status Date",
                    "Status",
                    "Disbursal Date",
                   
                    "Remarks",
                    "Action",
                  ].map((head) => (
                    <th
                      key={head}
                      className="text-left px-3 py-3 whitespace-nowrap text-[13px]"
                    >
                      {head}
                    </th>
                  ))}
                </tr>

              </thead>

              <tbody>

                {filteredApplications.map(
                  (app, index) => (
                    <tr
  key={app.id}
  className="border-t border-slate-100 hover:bg-blue-50/40 transition-all text-sm align-top"
>

  {/* S.No */}
  <td className="px-3 py-2.5">
    {index + 1}
  </td>

  {/* Lead Source */}
  <td className="px-3 py-2.5">
    {app.leadSource}
  </td>

  {/* Lead Date */}
  <td className="px-3 py-2.5">
    {app.fileLoginDate}
  </td>

  {/* Customer */}
  <td className="px-3 py-2.5 font-semibold">
    {app.customer}
  </td>

  {/* Mobile */}
  <td className="px-3 py-2.5">
    {app.mobile}
  </td>
{/* Occupation */}
<td className="px-3 py-2.5">
  {app.occupation}
</td>
  {/* Loan Type */}
  <td className="px-3 py-2.5">
    {app.loanType}
  </td>
{/* Loan Amount */}
  <td className="px-3 py-2.5">
    ₹ {Number(app.loanAmount).toLocaleString()}
  </td>

  {/* City */}
  <td className="px-3 py-2.5">
    {app.city}
  </td>
  {/* Bank */}
  <td className="px-3 py-2.5">
    {app.bank}
  </td>

  {/* Executive */}
  <td className="px-3 py-2.5">
    {app.executive}
  </td>

  {/* Login Date */}
  <td className="px-3 py-2.5">
    {app.loginDate}
  </td>

  

 {/* Status Date */}
<td className="px-3 py-2.5">
  {app.statusDate}
</td>

  {/* Status */}
  <td className="px-3 py-2.5">

    <select
      value={app.status}
      onChange={(e) =>
        updateStatus(
          app.id,
          e.target.value
        )
      }
     className={`px-3 h-[38px] rounded-lg text-xs font-semibold border border-transparent min-w-[170px] outline-none ${statusColor(app.status)}`}
    >
      {statuses.map((status) => (
        <option key={status}>
          {status}
        </option>
      ))}
      
    </select>

  </td>

  {/* Disbursal Date */}
  <td className="px-3 py-2.5">
    {app.disbursalDate || "-"}
  </td>

  <td className="px-3 py-2.5 max-w-[240px] truncate cursor-pointer"
title={app.remarks}>
  {app.remarks}
</td>

  {/* Action */}
  <td className="px-3 py-2.5">

    <div className="flex gap-2">

      <button
        onClick={() =>
          editCase(app)
        }
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-xs"
      >
        Edit
      </button>

      <button
        onClick={() =>
          deleteCase(app.id)
        }
        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-xs"
      >
        Delete
      </button>

    </div>

  </td>

</tr>
                  )
                )}
{filteredApplications.length === 0 && (
  <tr>
    <td
      colSpan={17}
      className="text-center py-10 text-slate-500"
    >
      No Loan Cases Found
    </td>
  </tr>
)}
              </tbody>

            </table>

          </div>
        </div>

       

      </div>
    </div>
  );
}