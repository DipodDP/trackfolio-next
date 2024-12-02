"use server";

// import { z } from "zod";
import { createSession, deleteSession } from "@/lib/stateless-session";
import { redirect } from "next/navigation";
import { AuthFormSchema } from "@/validation";
import authService from "@/services/auth.service";
import { SIGN_IN } from "@/constants/routes";

export async function signUp(prevState: any, formData: FormData) {
  const result = AuthFormSchema('sign-up').safeParse(Object.fromEntries(formData));

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }

  const { email, password, firstName } = result.data;

  const signUpCredentials = {
    email: email,
    password: password,
    username: firstName!,
  }
  const response = await authService.postRegister(signUpCredentials);  // Trigger the login mutation

  // If the status is in the 3xx range (redirect errors), we skip the handling
  if (response?.status >= 200 && response?.status < 400) {
    // await createSession(response.data.access_token);
    // redirect("/sign-in");
    return;
}
   // Handle specific error codes, such as 401 for unauthorized
  if (response?.status === 401) {
    return {
      errors: {
        email: ["Invalid password or email. Please try again."],
      },
    };
  } else if (response?.status === 400) {
    return {
      errors: {
        email: ["Bad request. Please check your input and try again."],
      },
    };
  } else {
    // Catch all other errors (e.g., server errors)
    return {
      errors: {
        email: ["Something went wrong. Please try again later."],
      },
    };
  }
}

export async function signIn(prevState: any, formData: FormData) {
  const result = AuthFormSchema('sign-in').safeParse(Object.fromEntries(formData));

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }

  const { email, password } = result.data;

  const signInCredentials = {
    username: email,
    password: password,
  };

  const response = await authService.postLogin(signInCredentials);  // Trigger the login mutation
  console.log('Token from API', response.data.access_token, response.status)

  // If the status is in the 3xx range (redirect errors), we skip the handling
  if (response?.status >= 200 && response?.status < 400) {
    await createSession(response.data.access_token);
    return;
}
   // Handle specific error codes, such as 401 for unauthorized
  if (response?.status === 401) {
    return {
      errors: {
        email: ["Invalid password or email. Please try again."],
      },
    };
  } else if (response?.status === 400) {
    return {
      errors: {
        email: ["Bad request. Please check your input and try again."],
      },
    };
  } else {
    // Catch all other errors (e.g., server errors)
    return {
      errors: {
        email: ["Something went wrong. Please try again later."],
      },
    };
  }

}
export async function logout() {
  await deleteSession();
  redirect(SIGN_IN);
}
