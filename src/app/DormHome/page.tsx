export default function UnitsConfirmation() {
    return (
      <div className="bg-gray-100 p-6">
        <div className="container mx-auto">
          {/* Availing Confirmation Section */}
          <h1 className="text-2xl font-bold mb-4">Friday, 14 Feb 2024</h1>
          <h2 className="text-xl font-semibold mb-4">Availing Confirmation</h2>
  
          <table className="w-full bg-white border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-3 border border-gray-300">Client Name</th>
                <th className="p-3 border border-gray-300">Property Name</th>
                <th className="p-3 border border-gray-300">Room</th>
                <th className="p-3 border border-gray-300">Amount</th>
                <th className="p-3 border border-gray-300">Payment Date</th>
                <th className="p-3 border border-gray-300">Slip Review</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-3 border border-gray-300">Juliannat</td>
                <td className="p-3 border border-gray-300">126/01/2024</td>
                <td className="p-3 border border-gray-300">212</td>
                <td className="p-3 border border-gray-300">7600</td>
                <td className="p-3 border border-gray-300">14/02/2024</td>
                <td className="p-3 border border-gray-300"><a href="#" className="text-blue-500">Review Slip</a></td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-300">Wouachi</td>
                <td className="p-3 border border-gray-300">162/01/2024</td>
                <td className="p-3 border border-gray-300">212</td>
                <td className="p-3 border border-gray-300">7600</td>
                <td className="p-3 border border-gray-300">15/02/2024</td>
                <td className="p-3 border border-gray-300"><a href="#" className="text-blue-500">Review Slip</a></td>
              </tr>
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
            <div className="bg-white rounded-lg shadow-md h-full flex flex-col">
              <img className="w-full h-48 object-cover rounded-t-lg" src="https://i.pinimg.com/736x/5c/c2/7d/5cc27de265cbc030f73d48daa20856d6.jpg" alt="Unit Image" />
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h2 className="text-lg font-bold">หอพักบุญพนันเชิง</h2>
                  <p className="text-gray-500">ซอยเกกีงาม 3</p>
                </div>
                <div className="flex items-center mt-2">
                  <span className="text-red-500 font-semibold">ห้อง 311 - Reserved</span>
                </div>
              </div>
            </div>
  
            <div className="bg-white rounded-lg shadow-md h-full flex flex-col">
              <img className="w-full h-48 object-cover rounded-t-lg" src="https://i.pinimg.com/736x/70/8b/4a/708b4a8bacfddd547cd5f77753bad58b.jpg" alt="Unit Image" />
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h2 className="text-lg font-bold">หอพักปาปิยองกุ๊กๆ</h2>
                  <p className="text-gray-500">ซอยเกกีงาม 3</p>
                </div>
                <div className="flex items-center mt-2">
                  <span className="text-green-500 font-semibold">ห้อง 312 - Awaiting Reservation</span>
                </div>
              </div>
            </div>
  
            <div className="bg-white rounded-lg shadow-md h-full flex flex-col">
              <img className="w-full h-48 object-cover rounded-t-lg" src="https://i.pinimg.com/736x/2b/c1/d8/2bc1d89b1c73075d086b9b0dd7f48e1b.jpg" alt="Unit Image" />
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h2 className="text-lg font-bold">หอพักโซเดมาคอม</h2>
                  <p className="text-gray-500">ซอยเกกีงาม 3</p>
                </div>
                <div className="flex items-center mt-2">
                  <span className="text-green-500 font-semibold">ห้อง 212 - Awaiting Reservation</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  