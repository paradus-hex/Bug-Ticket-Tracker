import db from '../db.js';


class ProjectAssignments {
    constructor(project_id, user_id) {
        this.project_id = project_id;
        this.user_id = user_id;
    }

    saveDevToDB() {
        let sql = `INSERT INTO project_assignments(
            project_id,
            user_id
            )
            VALUES(
                '${this.project_id}',
                '${this.user_id}');`;

        return db.execute(sql);
    }

    static findById(project_id, user_id) {
        let sql = `SELECT * FROM project_assignments
        WHERE
        project_id = '${project_id}' AND user_id = '${user_id}'`;

        return db.execute(sql);
    }

    static getAssignedDevs(project_id) {
        // we can select later which infos we want to disply
        // for now we are selecting everything (*)
        let sql = `SELECT * FROM users
        JOIN project_assignments
        ON (users.user_id = project_assignments.user_id)
        WHERE project_id = '${project_id}'`;

        return db.execute(sql);
    }

    static removeDev(project_id, user_id) {
        let sql = `DELETE FROM project_assignments 
        WHERE
        project_id = '${project_id}' AND user_id = '${user_id}'`;

        return db.execute(sql);
    }

    static removeAllDevs(project_id) {
        let sql = `DELETE FROM project_assignments
        WHERE
        project_id = '${project_id}'`;

        return db.execute(sql);
    }
}

export default ProjectAssignments;