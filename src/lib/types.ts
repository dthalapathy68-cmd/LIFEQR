export type ProfileFormData = {
  fullName: string;
  bloodGroup: string;
  dateOfBirth: string;
  emergencyContactName: string;
  emergencyContactPhone: string;
  allergies: string;
  medicalConditions: string;
  importantInfo: string;
  city: string;
  photoUrl?: string | null;
};

export type PublicProfile = {
  emergencyId: string;
  fullName: string;
  bloodGroup: string;
  allergies: string;
  medicalConditions: string;
  importantInfo: string;
  city: string;
  emergencyContactName: string;
  emergencyContactPhone: string;
  photoUrl: string | null;
  createdAt: string;
};

export type CreatedProfileResponse = {
  emergencyId: string;
  fullName: string;
  bloodGroup: string;
  qrDataUrl: string;
  profileUrl: string;
};
