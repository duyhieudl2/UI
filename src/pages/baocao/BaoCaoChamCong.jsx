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
    const resultValues = buildQueryString(parseParams(values));
    const ddd = moment(resultValues.fromDate).format("DD/MM/YYYY")
    console.log("OK: " + resultValues);
    console.log("OK2: " + ddd);
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
