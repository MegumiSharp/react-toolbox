import styles from "./ToDoList.module.css"
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from "@dnd-kit/utilities"

interface Task {
    id: string
    title: string
    priority: string
    completed: boolean
    createdDate: string  
    createdTime: string 
}

interface PriorityInfo {
    label: string
    color: string
}

const priorities: Record<string, PriorityInfo> = {
    LOW:    { label: 'LOW',    color: '#2dcc48' },
    MEDIUM: { label: 'MEDIUM', color: '#F4B400' },
    HIGH:   { label: 'HIGH',   color: '#e24540' },
}


function TaskItem({ task, onToggle, onDelete }: { task: Task, onToggle: (id: string, checked: boolean) => void,onDelete: (index: string)=>void })
{
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: task.id })

    const style = {
        transition,
        transform: CSS.Transform.toString(transform)
    }

    return(
        <div ref={setNodeRef} style={style} className={styles.task} {...attributes}>
            <div className={styles.taskRightContainer}>

                <div className={styles.dragIcon} {...listeners}>
                    <svg  width="9" height="18" viewBox="0 0 9 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path opacity="0.3" d="M4.5 17.9L0 13.4L1.45 11.95L4.5 15L7.55 11.95L9 13.4L4.5 17.9V17.9M1.45 5.95L0 4.5L4.5 0L9 4.5L7.55 5.95L4.5 2.9L1.45 5.95V5.95" fill="#484848"/>
                    </svg>
                </div>
                <input type='checkbox' className={styles.checkbox}
                        checked={task.completed}
                        onChange={(e)=> onToggle(task.id, e.target.checked)}/>
                <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="8" height="8" rx="4" fill={priorities[task.priority].color}/> 
                </svg>
                <span className={styles[`taskTitle-${task.completed}`]}>{task.title}</span>
            </div>
            <div className={styles.taskRightContainer}>
                <div className={styles.timePriorityContainer}>
                    <span className={styles.createdAt}>{task.createdTime} <br/> {task.createdDate}</span>
                    <span className={styles[`priorityPill${task.priority}`]}>{task.priority}</span>
                </div>

                <button className={styles.trashButton} onClick={()=> onDelete(task.id)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"><title>trash-can-2</title><g fill="#F7F7F7"><path d="m4.458,9l.463,11.125c.067,1.612,1.384,2.875,2.998,2.875h8.163c1.613,0,2.93-1.263,2.998-2.875l.463-11.125H4.458Z" stroke-width="0" fill="#F7F7F7"></path><path d="m16,5V1h-8v4H2v2h20v-2h-6Zm-6-2h4v2h-4v-2Z" fill="#F7F7F7" stroke-width="0"></path></g></svg>
                </button>
            </div>
        </div>
    )
}

export default TaskItem