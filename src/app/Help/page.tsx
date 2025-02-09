export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-8">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-4xl w-full">
        <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">How can we help you?</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* ช่อง Email */}
          <div className="bg-gray-100 p-6 rounded-lg text-center">
            <h3 className="text-sm font-semibold text-gray-600 mb-2">EMAIL</h3>
            <p className="text-lg text-gray-800">RadeDome@gmail.com</p>
          </div>

          {/* ช่อง Our Main Office */}
          <div className="bg-gray-100 p-6 rounded-lg text-center">
            <h3 className="text-sm font-semibold text-gray-600 mb-2">Our Main Office</h3>
            <p className="text-lg text-gray-800">
              1 Cheung Kruay 1 Alley,<br />
              Last Knizepa, Bangkok<br />
              10520
            </p>
          </div>

          {/* ช่อง Phone Number */}
          <div className="bg-gray-100 p-6 rounded-lg text-center">
            <h3 className="text-sm font-semibold text-gray-600 mb-2">Phone Number</h3>
            <p className="text-lg text-gray-800">00X-00X-00XX</p>
          </div>
        </div>
      </div>
    </div>
  );
}