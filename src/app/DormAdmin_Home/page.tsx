import React from "react";

const MyUnitsAvailing = () => {
  return (
    <div className="bg-gray-100 p-6 min-h-screen">
      <div className="container mx-auto">
        {/* Availing Confirmation Section */}
        <h1 className="text-2xl font-bold mb-4">Friday, 14 Feb 2024</h1>
        <h2 className="text-xl font-semibold mb-4">Availing Confirmation</h2>

        <table className="w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              {[
                "Client Name",
                "Property Name",
                "Room",
                "Amount",
                "Payment Date",
                "Slip Review",
              ].map((header) => (
                <th key={header} className="p-3 border border-gray-300">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              { name: "Juliannat", property: "126/01/2024", room: "212", amount: "7600", date: "14/02/2024" },
              { name: "Wouachi", property: "162/01/2024", room: "212", amount: "7600", date: "15/02/2024" },
            ].map((client, index) => (
              <tr key={index}>
                <td className="p-3 border border-gray-300">{client.name}</td>
                <td className="p-3 border border-gray-300">{client.property}</td>
                <td className="p-3 border border-gray-300">{client.room}</td>
                <td className="p-3 border border-gray-300">{client.amount}</td>
                <td className="p-3 border border-gray-300">{client.date}</td>
                <td className="p-3 border border-gray-300">
                  <a href="#" className="text-blue-500">Review Slip</a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Search & Filter Section */}
        <div className="flex justify-end mt-6">
          <div className="flex items-center space-x-2">
            <input type="text" placeholder="Search unit" className="border rounded p-2" />
            <button className="bg-blue-500 text-white p-2 rounded">🔍</button>
            <button className="bg-blue-500 text-white p-2 rounded">Filter</button>
          </div>
        </div>

        {/* My Units Section */}
        <div className="flex items-center mt-8 mb-4 space-x-2">
          <div className="text-lg font-semibold">My Units</div>
          <a href="#" className="text-blue-500">View All</a>
        </div>

        {/* Responsive Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {[
            { name: "หอพักบุญพนันเชิง", location: "ซอยเกกีงาม 3", room: "311 - Reserved", color: "text-red-500", img: "https://i.pinimg.com/736x/5c/c2/7d/5cc27de265cbc030f73d48daa20856d6.jpg" },
            { name: "หอพักปาปิยองกุ๊กๆ", location: "ซอยเกกีงาม 3", room: "312 - Awaiting Reservation", color: "text-green-500", img: "https://i.pinimg.com/736x/70/8b/4a/708b4a8bacfddd547cd5f77753bad58b.jpg" },
            { name: "หอพักโซเดมาคอม", location: "ซอยเกกีงาม 3", room: "212 - Awaiting Reservation", color: "text-green-500", img: "https://i.pinimg.com/736x/2b/c1/d8/2bc1d89b1c73075d086b9b0dd7f48e1b.jpg" },
          ].map((unit, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md h-full flex flex-col">
              <img className="w-full h-48 object-cover rounded-t-lg" src={unit.img} alt="Unit Image" />
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h2 className="text-lg font-bold">{unit.name}</h2>
                  <p className="text-gray-500">{unit.location}</p>
                </div>
                <div className="flex items-center mt-2">
                  <span className={`${unit.color} font-semibold`}>{unit.room}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyUnitsAvailing;
