import ForgotPassword from '@/components/login/get-password';

export default function GetPasswordPage() {
  // async function changePasswordHandler(passwordData) {
  //   const response = await fetch('/api/user/change-password', {
  //     method: 'PATCH',
  //     body: JSON.stringify(passwordData),
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //   });
  //   const data = await response.json();
  //   console.log(data);
  // }

  return (
    <ForgotPassword /*onChangePassword={changePasswordHandler}*/
    />
  );
}
