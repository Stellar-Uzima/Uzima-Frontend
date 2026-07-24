import { useState } from "react";

interface AvatarEmojiPickerProps {
  availableAvatars?: string[];
  onSubmit?: (avatar: string) => void;
}

const DEFAULT_AVATARS = [
  "😀",
  "😎",
  "🤖",
  "🚀",
  "🔥",
  "🌟",
  "🎯",
  "💎",
];

export default function AvatarEmojiPicker({
  availableAvatars = DEFAULT_AVATARS,
  onSubmit,
}: AvatarEmojiPickerProps) {
  const [selectedAvatar, setSelectedAvatar] = useState<string | null>(null);
  const [error, setError] = useState("");

  const handleSelect = (avatar: string) => {
    // Validate avatar exists in allowed list
    if (!availableAvatars.includes(avatar)) {
      setError("Invalid avatar selected.");
      return;
    }

    setSelectedAvatar(avatar);
    setError("");
  };

  const handleSubmit = () => {
    // Prevent empty submission
    if (!selectedAvatar) {
      setError("Please select an avatar.");
      return;
    }

    // Extra validation
    if (!availableAvatars.includes(selectedAvatar)) {
      setError("Selected avatar is invalid.");
      return;
    }

    setError("");
    onSubmit?.(selectedAvatar);
  };

  return (
    <div className="w-full max-w-md">
      <h3 className="mb-3 text-lg font-semibold">
        Choose Your Avatar
      </h3>

      <div className="grid grid-cols-4 gap-3">
        {availableAvatars.map((avatar) => (
          <button
            key={avatar}
            type="button"
            onClick={() => handleSelect(avatar)}
            aria-label={`Select avatar ${avatar}`}
            className={`flex h-14 w-14 items-center justify-center rounded-lg border text-2xl transition
              ${
                selectedAvatar === avatar
                  ? "border-blue-500 bg-blue-50 ring-2 ring-blue-500"
                  : "border-gray-300 hover:border-gray-400"
              }`}
          >
            {avatar}
          </button>
        ))}
      </div>

      {error && (
        <p
          role="alert"
          className="mt-3 text-sm text-red-600"
        >
          {error}
        </p>
      )}

      <button
        type="button"
        onClick={handleSubmit}
        disabled={!selectedAvatar}
        className={`mt-4 w-full rounded-lg px-4 py-2 font-medium text-white transition
          ${
            selectedAvatar
              ? "bg-blue-600 hover:bg-blue-700"
              : "cursor-not-allowed bg-gray-400"
          }`}
      >
        Save Avatar
      </button>
    </div>
  );
}