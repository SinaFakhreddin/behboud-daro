export default function FilterSection() {
  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="flex flex-wrap items-center gap-3 mb-6">
        <button className="border border-gray-300 px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-gray-100">
          <span>🧭</span> فیلتر پیشرفته
        </button>

        {/*<select*/}
        {/*  value={province}*/}
        {/*  onChange={(e) => setProvince(e.target.value)}*/}
        {/*  className="border border-gray-300 px-3 py-2 rounded-lg focus:ring-2 focus:ring-teal-500"*/}
        {/*>*/}
        {/*  <option value="">استان</option>*/}
        {/*  <option value="هرمزگان">هرمزگان</option>*/}
        {/*  <option value="فارس">فارس</option>*/}
        {/*  <option value="اصفهان">اصفهان</option>*/}
        {/*</select>*/}

        {/*<select*/}
        {/*  value={specialty}*/}
        {/*  onChange={(e) => setSpecialty(e.target.value)}*/}
        {/*  className="border border-gray-300 px-3 py-2 rounded-lg focus:ring-2 focus:ring-teal-500"*/}
        {/*>*/}
        {/*  <option value="">تخصص</option>*/}
        {/*  <option value="زیبایی">زیبایی</option>*/}
        {/*  <option value="داخلی">داخلی</option>*/}
        {/*  <option value="دندانپزشکی">دندانپزشکی</option>*/}
        {/*</select>*/}
      </div>
    </div>
  );
}
