# Pre-interview test

Welcome to our short Angular test! If you have any queries at all, please feel free to email Dan at dan.soper@victoriaforms.com.

There is no time limit.

You are welcome to Fork this project in Stackblitz and work on it here (then send a link to your project) or you can download it locally (then send in your source files).

## Summary

The task involves adding Reactive Forms to some HTML form inputs, adding validation, and calling a service to update a property.

## Detail

I have created a simple HTML form in the `AppComponent` with four input fields.

1. Construct a `FormGroup` for the four fields, and link the `FormControl`s to each field.
2. Add validation to each `FormControl`, as follows:
   a. The name field is required. It must be at least two words.
   b. The email address field is required, and must be a valid email address.
   c. The repeat email field must match the first email field.
   d. The password field is required, and must be at least 8 characters.
3. I have already added the validation messages to the HTML, but they're currently all hidden with `ngIf`s. You should alter these `ngIf`s to display the relevant message when required. Messages should only show up once the user has been into and left the field.
4. The Submit form button should be disabled until the form is valid.
5. I have created a `NameInfoService` which simulates a call to the server. You should debounce the user's input on the `name` control (500ms) and then call the `getNameInfo` method, passing the value from the name control. The returned message should be assigned to `nameMessage`. I have already added a call to the `NameInfoService` in the constructor: you can remove this.
