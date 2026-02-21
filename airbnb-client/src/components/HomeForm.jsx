import { useFormik } from "formik";
export default function HomeForm({
  Schema,
  onSubmit,
  initialValues,
  texts,
}) {
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: Schema,
    onSubmit: onSubmit,
  });

  return (
    <form
      onSubmit={formik.handleSubmit}
      encType="multipart/form-data"
      className="w-full max-w-xl bg-white p-8 rounded-2xl shadow-lg space-y-6"
    >
      <input type="hidden" name="_id" value="" />

      <h1 className="text-2xl font-semibold text-gray-800 text-center">
        {texts.title}
      </h1>

      {/* <!-- House Name --> */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-600">House Name</label>
        <input
          type="text"
          name="house_name"
          required
          minLength="7"
          value={formik.values.house_name}
          onChange={formik.handleChange}
          placeholder="Enter house name"
          className="w-full h-11 px-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#FF385C] focus:border-[#FF385C] transition"
        />
      </div>

      {/* <!-- Price --> */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-600">
          Price (per night)
        </label>
        <input
          type="number"
          name="price"
          required
          value={formik.values.price}
          onChange={formik.handleChange}
          placeholder="Enter price"
          className="w-full h-11 px-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#FF385C] focus:border-[#FF385C] transition"
        />
      </div>

      {/* <!-- Location --> */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-600">Location</label>
        <input
          type="text"
          name="location"
          required
          value={formik.values.location}
          onChange={formik.handleChange}
          placeholder="Enter location"
          className="w-full h-11 px-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#FF385C] focus:border-[#FF385C] transition"
        />
      </div>

      {/* <!-- Description --> */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-600">Description</label>
        <textarea
          name="description"
          rows="4"
          required
          value={formik.values.description}
          onChange={formik.handleChange}
          placeholder="Write a short description..."
          className="w-full px-4 py-3 rounded-lg border border-gray-300 resize-none focus:outline-none focus:ring-2 focus:ring-[#FF385C] focus:border-[#FF385C] transition"
        ></textarea>
      </div>

      {/* <!-- Photo Upload --> */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-600">
          Upload Photo
        </label>
        <input
          type="file"
          name="photo"
          onChange={(event) => {
            console.log(event.currentTarget);
            formik.setFieldValue("photo", event.currentTarget.files[0]);
          }}
          className="w-full text-sm cursor-pointer text-gray-600
          file:mr-4 file:py-2 file:px-4
          file:rounded-lg file:border-0
          file:text-sm file:font-medium
          file:bg-[#FF385C] file:text-white 
          hover:file:bg-[#e73455]
          cursor-pointer transition"
          accept="image/*"
        />
      </div>

      {/* <!-- Submit Button --> */}
      <button
        type="submit"
        className="w-full cursor-pointer h-11 rounded-lg font-semibold text-white transition duration-200 active:scale-95  
         bg-[#e73455] hover:bg-[#d32e4c]"
      >
        {texts.submit}
      </button>
    </form>
  );
}
