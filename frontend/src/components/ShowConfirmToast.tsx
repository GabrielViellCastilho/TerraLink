import { toast } from "react-toastify";

export function ShowConfirmToast(message: string, onConfirm: () => void) {
  toast(
    ({ closeToast }) => (
      <div className="flex flex-col gap-3">
        <p className="text-base">{message}</p>

        <div className="flex justify-end gap-2">
          <button
            onClick={() => {
              onConfirm();
              closeToast();
            }}
            className="px-3 py-1 rounded bg-green-600 text-white"
          >
            Yes
          </button>

          <button
            onClick={closeToast}
            className="px-3 py-1 rounded bg-gray-400 text-white"
          >
            No
          </button>
        </div>
      </div>
    ),
    { autoClose: false, closeOnClick: false }
  );
}
