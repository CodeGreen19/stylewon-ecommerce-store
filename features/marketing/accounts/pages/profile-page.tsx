import React from "react";
import { AccountHeader } from "../components/account-header";
import { ProfileInfo } from "../components/profile-info";

export default function ProfilePage() {
  return (
    <div>
      <AccountHeader
        label="Profile"
        descriptions="View and edit your profile information."
      />
      <ProfileInfo />
    </div>
  );
}
