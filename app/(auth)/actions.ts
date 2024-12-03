"use server";

import { createSession, deleteSession } from "@/lib/stateless-session";
import { redirect } from "next/navigation";
import { AuthFormSchema } from "@/validation";
import authService from "@/services/auth.service";
import { SIGN_IN } from "@/constants/routes";


type AuthErrors = {
  firstName?: string[];
  email?: string[];
  password?: string[];
  general?: string[];  // Adding general error field
};

export async function signUp(prevState: any, formData: FormData) {
  // Validate form data using your schema
  const result = AuthFormSchema('sign-up').safeParse(Object.fromEntries(formData));
  const errors = result.error?.flatten().fieldErrors as AuthErrors

  if (!result.success) {
    // If validation fails, return field errors
    return {
      errors: errors,
    };
  }

  const { email, password, firstName } = result.data;

  let response: any; // To store the API response

  try {
    // Prepare signup credentials
    const signUpCredentials = {
      email: email,
      password: password,
      username: firstName!,
    };

    // Make the API call for registration
    response = await authService.postRegister(signUpCredentials); 

  } catch (error: any) {
    console.error(`Authentication error for ${email}: ${error.response?.status} ${error.response?.data.detail}`);

    // Handle specific error cases based on response status code
    if (error?.response?.status === 400) {
      if ( error?.response?.data.detail === "REGISTER_USER_ALREADY_EXISTS" ) {
        return {
          errors: {
            email: ["User already exists. Please try a different email address."],
          },
        };
      } else {
        return {
          errors: {
            general: ["Bad request. Please check the data you entered."],
          },
        };
      }
    } else {
      // Catch all other errors (e.g., server errors)
      return {
        errors: {
          general: ["Something went wrong. Please try again later."],
        },
      };
    }

  } finally {
    // If response is in the 200-3xx range (redirects), skip additional handling or return
    if (response?.status >= 200 && response?.status < 400) {
      redirect(SIGN_IN);
    }
  }
}


export async function signIn(prevState: any, formData: FormData) {
  const result = AuthFormSchema('sign-in').safeParse(Object.fromEntries(formData));
  const errors = result.error?.flatten().fieldErrors as AuthErrors

  if (!result.success) {
    // If validation fails, return field errors
    return {
      errors: errors,
    };
  }

  const { email, password } = result.data;

  let response: any; // To store the API response

  try {
    const signInCredentials = {
      username: email,
      password: password,
    };

    response = await authService.postLogin(signInCredentials);  // Trigger the login mutation
    // console.log('Token from API', response.data.access_token, response.status)

  } catch (error: any) {
    console.error(`Authentication error for ${email}: ${error.response?.status} ${error.response?.data.detail}`);
     // Handle specific error codes, such as 401 for unauthorized
    if (error?.response?.status === 400) {
      if ( error?.response?.data.detail === "LOGIN_BAD_CREDENTIALS" ) {
        return {
          errors: {
            general: ["Invalid password or email. Please try again."],
          },
        };
      } else {
        return {
          errors: {
            general: ["Bad request. Please check the data you entered."],
          },
        };
      }
    } else {
      // Catch all other errors (e.g., server errors)
      return {
        errors: {
          general: ["Something went wrong. Please try again later."],
        },
      };
    }

  } finally {
    // If response is in the 200-3xx range (redirects), skip additional handling or return
    if (response?.status >= 200 && response?.status < 400) {
      await createSession(response.data.access_token);
    }
  }
}


export async function logout() {
  await deleteSession();
  redirect(SIGN_IN);
}
