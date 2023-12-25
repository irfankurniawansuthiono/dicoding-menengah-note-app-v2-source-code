import { useSearchParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Heading, Text, Button } from "@chakra-ui/react";
import { getNote } from "../../../../../Api/Api";
import SpinnerComponent from "../../../../../Components/Spinner/Spinner";
import { useLanguageStore } from "../../../../../Zustand/UserPreferences";
type NoteDetailsTemplateProps = {
  id: string;
  title: string;
  body: string;
  createdAt: string;
  archived: boolean;
  owner: string;
};

export const NotesDetailsTemplate = () => {
  const navigate = useNavigate();
  const { language } = useLanguageStore();
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const [data, setData] = useState<NoteDetailsTemplateProps | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDB = async () => {
      try {
        if (id !== null) {
          const result = await getNote({ id });
          return result.data;
        }
      } catch (error) {
        console.error("Error fetching note:", error);
        return null;
      }
    };

    fetchDB().then((data) => {
      setData(data);
      setLoading(false);
    });
  }, [id]);

  const createdAtDate = data ? new Date(data.createdAt) : null;

  const formattedCreatedAt = createdAtDate
    ? `${createdAtDate.getFullYear()}-${(createdAtDate.getMonth() + 1)
        .toString()
        .padStart(2, "0")}-${createdAtDate
        .getDate()
        .toString()
        .padStart(2, "0")} ${createdAtDate
        .getHours()
        .toString()
        .padStart(2, "0")}:${createdAtDate
        .getMinutes()
        .toString()
        .padStart(2, "0")}`
    : "";

  return loading ? (
    <SpinnerComponent />
  ) : data ? (
    <>
      <Heading as={"h1"}>
        {language === "en" ? "Notes Title : " : "Judul Catatan : "} {data.title}
      </Heading>
      <Text>
        {language === "en" ? "Notes Body : " : "Isi Catatan : "} {data.body}
      </Text>
      <Text>
        {language === "en" ? "Notes Created At : " : "Dibuat Pada : "}
        {formattedCreatedAt}
      </Text>
      <Text>
        {language === "en" ? "Notes Status : " : "Status Catatan : "}{" "}
        {data.archived ? "archived" : "unarchived"}
      </Text>
      <Text>
        {language === "en" ? "Notes Owner ID : " : "ID Pemilik Catatan : "}{" "}
        {data.owner}
      </Text>
      <Text>
        {language === "en" ? "Notes ID : " : "ID Catatan : "}
        {data.id}
      </Text>
      <Button onClick={() => navigate(-1)}>
        {language === "en" ? "Back" : "Kembali"}
      </Button>
    </>
  ) : (
    <Heading>
      {" "}
      {language === "en" ? "Notes Not Found" : "Catatan Tidak Ditemukan"}{" "}
    </Heading>
  );
};
