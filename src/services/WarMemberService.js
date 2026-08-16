const WarMemberRepostitory = require ('../repositories/WarMemberRepository');

function getWarMemberSummary() {
    const data = WarMemberRepostitory.findAll();

    const meta = data.warConfig.battlesExpectedPerWeek;
    const totalWeeks = data.warConfig.weeksCount;
}