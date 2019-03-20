import React, { useContext } from "react";
import styled from "styled-components";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";
import { MdDescription } from "react-icons/md";
import { useQuery } from "react-apollo-hooks";
import { GET_FREQUENCY_LEVELS_QUERY } from "../../../queries";
import { Store } from "../../../GlobalState/store";
import moment from "moment";

const Container = styled.div`
  width: 100%;
  height: 500px;
  border: 1px solid #ececec;
  border-radius: 5px;
  margin-top: 15px;
  background: white;
  margin-bottom: 30px;
`;

const Title = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 15px 10px 15px;
  background: #f6f8fa;
  color: #5c5c5c;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  font-size: 0.8rem;
  border-bottom: 1px solid #dcdcdc;
  span {
    margin-top: 2px;
  }
`;

const DocumentIcon = styled(MdDescription)`
  margin-left: 3px;
  margin-right: 8px;
  font-size: 1rem;
`;

const Contents = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ChartResizer = styled.div`
  width: 80%;
  height: 80%;
`;
const LevelGraph = () => {
  const { state } = useContext(Store);
  const { loading, data } = useQuery(GET_FREQUENCY_LEVELS_QUERY, {
    variables: { projectId: Number(state.selectedProjectId) }
  });

  if (loading) {
    return <div>Loading..</div>;
  }

  if (
    data &&
    data.GetFrequencyLevels &&
    data.GetFrequencyLevels.frequencyLevels &&
    data.GetFrequencyLevels.frequencyLevels.length !== 0
  ) {
    data.GetFrequencyLevels.frequencyLevels.map(
      (object, key) =>
        (data.GetFrequencyLevels.frequencyLevels[key].date = moment(
          Number(object.date)
        ).format("YYYY-MM-DD"))
    );
  }

  return (
    <Container>
      <Title>
        <DocumentIcon />
        <span>Statistics</span>
      </Title>
      <Contents>
        <ChartResizer>
          <ResponsiveContainer>
            <LineChart
              data={data.GetFrequencyLevels.frequencyLevels}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="notice" stroke="#10c71a" />
              <Line type="monotone" dataKey="debug" stroke="#c762ce" />
              <Line type="monotone" dataKey="warning" stroke="#ff9400" />
              <Line type="monotone" dataKey="danger" stroke="#ff4d00" />
            </LineChart>
          </ResponsiveContainer>
        </ChartResizer>
      </Contents>
    </Container>
  );
};
export default LevelGraph;
