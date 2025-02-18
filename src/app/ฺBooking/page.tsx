export default function BookingList() {
    return (
      <div className="bg-gray-100 p-6">
        {/* Container */}
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold">RADAR DORM</h1>
            <div className="flex space-x-4">
              <button className="text-gray-700">☰</button>
              <button className="text-gray-700">👤</button>
            </div>
          </div>
  
          {/* Booking Cards */}
          <div className="space-y-4">
            {/* Booking Item 1 */}
            <div className="bg-white rounded-lg shadow-md flex overflow-hidden">
              <img
                src="https://i.pinimg.com/736x/2b/c1/d8/2bc1d89b1c73075d086b9b0dd7f48e1b.jpg"
                className="w-32 h-32 object-cover"
                alt="Room"
              />
              <div className="flex-1 p-4">
                <h2 className="text-lg font-bold">หอพักนักศึกษาอาร์มนศรี</h2>
                <p className="text-sm text-gray-600">📍 ซอยเกกีงาม 3</p>
                <p className="text-sm"><strong>ห้อง 311</strong></p>
                <p className="text-sm">เบอร์ติดต่อ: 081-245-4356</p>
                <p className="text-sm text-gray-500">Booking day: 14/02/24</p>
              </div>
              <div className="flex flex-col items-end p-4">
                <a href="#" className="text-blue-500 text-sm">See detail</a>
                <span className="bg-green-200 text-green-700 px-3 py-1 mt-2 rounded-full text-sm">Booking complete</span>
              </div>
            </div>
  
            {/* Booking Item 2 */}
            <div className="bg-white rounded-lg shadow-md flex overflow-hidden">
              <img
                src="https://i.pinimg.com/736x/5c/c2/7d/5cc27de265cbc030f73d48daa20856d6.jpg"
                className="w-32 h-32 object-cover"
                alt="Room"
              />
              <div className="flex-1 p-4">
                <h2 className="text-lg font-bold">หอพักนักศึกษาอาร์มนศรี</h2>
                <p className="text-sm text-gray-600">📍 ซอยเกกีงาม 3</p>
                <p className="text-sm"><strong>ห้อง 311</strong></p>
                <p className="text-sm">เบอร์ติดต่อ: 081-245-4356</p>
                <p className="text-sm text-gray-500">Booking day: 14/02/24</p>
              </div>
              <div className="flex flex-col items-end p-4">
                <a href="#" className="text-blue-500 text-sm">See detail</a>
                <span className="bg-yellow-200 text-yellow-700 px-3 py-1 mt-2 rounded-full text-sm">Verifying payment</span>
              </div>
            </div>
  
            {/* Booking Item 3 */}
            <div className="bg-white rounded-lg shadow-md flex overflow-hidden">
              <img
                src="https://i.pinimg.com/736x/70/8b/4a/708b4a8bacfddd547cd5f77753bad58b.jpg"
                className="w-32 h-32 object-cover"
                alt="Room"
              />
              <div className="flex-1 p-4">
                <h2 className="text-lg font-bold">หอพักนักศึกษาอาร์มนศรี</h2>
                <p className="text-sm text-gray-600">📍 ซอยเกกีงาม 3</p>
                <p className="text-sm"><strong>ห้อง 311</strong></p>
                <p className="text-sm">เบอร์ติดต่อ: 081-245-4356</p>
                <p className="text-sm text-gray-500">Booking day: 14/02/24</p>
              </div>
              <div className="flex flex-col items-end p-4">
                <a href="#" className="text-blue-500 text-sm">See detail</a>
                <span className="bg-purple-200 text-purple-700 px-3 py-1 mt-2 rounded-full text-sm">Waiting for payment</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  