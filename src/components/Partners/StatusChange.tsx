import { useEffect, useState } from "react";
import {
  WORK_STATUS_TYPE_DATA,
  WORK_STATUS_TYPE_KEY,
} from "../Utils/constants";
import { RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { setRecallApi } from "@/redux/reducer/RecallApi";
import { useRouter } from "next/router";
import axios from "axios";
import ShowToast, { errorMessage, error, success } from "../Utils/ShowToast";
import { removeToken } from "@/redux/reducer/login";

const StatusChange = ({ data, token }: any) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const Base_url = process.env.NEXT_PUBLIC_BASE_URL || "";

  return (
    <div className="dataTables_filter mb-1">
      <select
        className="form-select"
        onChange={(e) => {
          async function getCategoryData() {
            try {
              const FullPath = `${Base_url}/${"work/update"}/${data.work_id}`;
              console.log(data);
              const res = await axios.put(
                FullPath,
                { ...data, status: e.target.value },
                {
                  headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: "application/json",
                  },
                }
              );
              if (res?.data?.success) {
                dispatch(setRecallApi(true));
                ShowToast(success, res?.data?.message);
              } else if (res.data.status === 401) {
                dispatch(removeToken());
                router?.push("/login");
              }
            } catch (failedError: any) {
              dispatch(setRecallApi(true));
              ShowToast(error, failedError?.response?.data?.message);
              return failedError;
            }
          }
          getCategoryData();
        }}
        aria-label="Default select example"
      >
        {WORK_STATUS_TYPE_KEY.map((value: string, index) => (
          <option
            value={
              WORK_STATUS_TYPE_DATA[
                value as unknown as keyof typeof WORK_STATUS_TYPE_DATA
              ]
            }
            selected={
              data?.status ===
              WORK_STATUS_TYPE_DATA[value as keyof typeof WORK_STATUS_TYPE_DATA]
            }
            key={index}
          >
            {WORK_STATUS_TYPE_DATA[value as keyof typeof WORK_STATUS_TYPE_DATA]}
          </option>
        ))}
      </select>
    </div>
  );
};

export default StatusChange;
