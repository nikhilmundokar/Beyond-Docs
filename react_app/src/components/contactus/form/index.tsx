import React from "react";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import emailjs, { send } from "emailjs-com";

import "./style.scss";
interface FormData {
  from_name: string;
  reply_to: string;
  phone_number: string;
  subject: string;
  message: string;
}

function Index() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    try {
      const emailData = {
        data,
      };

      await send(
        "service_g8f2sa3",
        "template_5gf001l",
        emailData,
        "Yps0Ed9vOyN_WcLOu"
      );
      console.log("Success!");
      formSuccess();
    } catch (error) {
      console.error("Failed...", error);
    }
  };

  const formSuccess = () => {
    toast("Thanks for submitting your query!");
    (document.getElementById("queryForm") as HTMLFormElement)?.reset();
  };

  return (
    <div className="query-form">
      <ToastContainer />
      <form id="queryForm" onSubmit={handleSubmit(onSubmit)}>
        <div className="input-field">
          <input
            type="text"
            {...register("from_name", { required: "Name is required" })}
            placeholder="Name"
          />
          {errors.from_name && (
            <p className="error">{errors.from_name.message}</p>
          )}
        </div>

        <div className="input-field">
          <div>
            <input
              type="text"
              {...register("reply_to", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
              placeholder="Email"
            />
            {errors.reply_to && (
              <p className="error">{errors.reply_to.message}</p>
            )}
          </div>
        </div>

        <div className="input-field">
          <div>
            <input
              type="text"
              placeholder="Phone Number"
              {...register("phone_number", {
                required: "Phone number is required",
                minLength: { value: 8, message: "Phone number is not valid" },
              })}
            />
            {errors.phone_number && (
              <p className="error">{errors.phone_number.message}</p>
            )}
          </div>
        </div>

        <div className="input-field">
          <div>
            <input
              type="text"
              placeholder="Subject"
              {...register("subject", {
                required: "Subject is required",
                minLength: {
                  value: 10,
                  message: "Minimum 10 characters are required",
                },
              })}
            />
            {errors.subject && (
              <p className="error">{errors.subject.message}</p>
            )}
          </div>
        </div>

        <div className="input-field full-width">
          <div>
            <textarea
              className="textarea"
              placeholder="Your Message"
              {...register("message", {
                required: "Message is required",
                minLength: {
                  value: 20,
                  message: "Minimum 20 characters are required",
                },
                maxLength: {
                  value: 500,
                  message: "Maximum 500 characters are allowed",
                },
              })}
            />
            {errors.message && (
              <p className="error">{errors.message.message}</p>
            )}
          </div>
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Index;
