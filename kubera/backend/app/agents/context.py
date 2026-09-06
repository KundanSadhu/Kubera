from jinja2 import Template

TEMPLATE = Template(
    """# ROLE
{{ role }}

# PROJECT
Tenant: {{ tenant_id }}
{% if task %}Current Task: {{ task.title }} — {{ task.description }}{% endif %}

# KNOWLEDGE (RAG top-5)
{% for k in knowledge %}- {{ k }}
{% endfor %}

# NOTEBOOK (working memory)
{% for n in notebook %}- {{ n.key }}: {{ n.body[:500] }}
{% endfor %}

# TASK BOARD (my open tasks)
{% for t in my_tasks %}- [{{ t.status }}] {{ t.title }}
{% endfor %}

# CONVERSATION
User: {{ user_message }}

# INSTRUCTIONS
Respond concisely. If task requires tool, output JSON tool call. End with {{ marker }} when done.
"""
)


def build_context(role: str, tenant_id: str, task, knowledge: list[str], notebook: list, my_tasks: list, user_message: str, marker: str = "<<HANDLE_COMPLETE>>") -> str:
    return TEMPLATE.render(
        role=role,
        tenant_id=tenant_id,
        task=task,
        knowledge=knowledge or [],
        notebook=notebook or [],
        my_tasks=my_tasks or [],
        user_message=user_message,
        marker=marker,
    )
