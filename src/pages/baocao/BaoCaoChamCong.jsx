import { buildQueryString, parseParams } from "../../utils/function";
import { useEffect, useState, useCallback } from "react";
import { FormBaoCao } from "../../components/FormBaoCao";

import * as reportServices from "../../api/reportServices";
import { Container } from "@mui/system";
import moment from "moment";

export default function BaoCaoChamCong() {
  const [filterTaskList, setFilterTaskList] = useState();

  useEffect(() => {
    const fetchApi = async () => {
      const result = await reportServices.chiTietInOut(filterTaskList);
      console.log(result);
    };
    fetchApi();
  }, [filterTaskList]);

  const handleSearch = useCallback((values) => {
    const ddd = moment(values.fromDate).format("DD/MM/YYYY")
    values.tungayss = "aaaaaaaaaaaaasad";
    const resultValues = buildQueryString(parseParams(values));
    console.log(resultValues)
    setFilterTaskList(resultValues);
  });

  return (
    <div>
      <Container>
        <FormBaoCao handleSearch={handleSearch} />
      </Container>
    </div>
  );
}
