import moment from "moment";
import { timeFormat } from "../../../const/const";

const TimeCellRenderer = (props: any) => {
  return (
    <div className="time-cell-renderer">
      {moment(props.data.createdAt).format(timeFormat)}
    </div>
  );
};

export default TimeCellRenderer;
