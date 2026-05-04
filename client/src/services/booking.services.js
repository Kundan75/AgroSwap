import api from "../Api/Api";

export const CreateBookingService = async (formData) => {
  try {
    const res = await api.post("/booking/create", formData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    return res.data;

  } catch (error) {
    console.error("CreateBookingService Error:", error);

    return {
      success: false,
      message:
        error?.response?.data?.message || "Booking failed",
    };
  }
};

export const FetchBookingService = async (filter) => {
  try {
    const res = await api.get(`/booking/my-bookings?filter=${filter}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    return res.data;

  } catch (error) {
    console.error("FetchBookingService Error:", error);

    return {
      success: false,
      bookings: [],
      message:
        error?.response?.data?.message || "Failed to fetch bookings",
    };
  }
};